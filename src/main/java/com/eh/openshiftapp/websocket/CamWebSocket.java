package com.eh.openshiftapp.websocket;

import java.io.StringReader;

import javax.enterprise.context.ApplicationScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.eh.openshiftapp.model.Webcam;

@ApplicationScoped
@ServerEndpoint("/actions")
public class CamWebSocket {

	private static CamSessionHandler sessionHandler = new CamSessionHandler();

	@OnOpen
	public void open(Session session) {
		session.setMaxTextMessageBufferSize(1024 * 512);
		sessionHandler.addSession(session);
		sessionHandler.sendToSession(session, sessionHandler.createAddMessage(null));
	}

	@OnClose
	public void close(Session session) {
		sessionHandler.removeSession(session);
	}

	@OnError
	public void onError(Throwable error) {
		System.out.println("CamWebSocket Error: " + error.getMessage());
		// error.printStackTrace();
	}

	@OnMessage
	public void handleMessage(String message, Session session) {
		try (JsonReader reader = Json.createReader(new StringReader(message))) {
			JsonObject jsonMessage = reader.readObject();

			if ("webcam".equals(jsonMessage.getString("action"))) {
				if (sessionHandler.getWebcam(jsonMessage.getString("clientIP")) != null) {
					sessionHandler.getWebcam(jsonMessage.getString("clientIP"))
							.setBlobString(jsonMessage.getString("blobString"));
					sessionHandler.sendToSession(session, sessionHandler
							.createAddMessage(sessionHandler.getWebcam(jsonMessage.getString("clientIP"))));
				} else {
					Webcam webcam = new Webcam();
					webcam.setClientIP(jsonMessage.getString("clientIP"));
					webcam.setGeoLocation(jsonMessage.getString("geoLocation"));
					webcam.setBlobString(jsonMessage.getString("blobString"));
					sessionHandler.addWebcam(jsonMessage.getString("clientIP"), webcam);
					sessionHandler.sendToSession(session, sessionHandler.createAddMessage(webcam));
				}
				// CamSessionHandler.WEBCAM.setClientIP(jsonMessage.getString("clientIP"));
				// CamSessionHandler.WEBCAM.setGeoLocation(jsonMessage.getString("geoLocation"));
				// CamSessionHandler.WEBCAM.setBlobString(jsonMessage.getString("blobString"));
			} else if ("admin".equals(jsonMessage.getString("action"))) {
				sessionHandler.sendToSession(session,
						sessionHandler.createAddMessage(sessionHandler.getWebcam(jsonMessage.getString("clientIP"))));
			}
		}
	}
}
