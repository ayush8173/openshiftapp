//package com.eh.openshiftapp.websocket;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.Map;
//import java.util.Set;
//
//import javax.enterprise.context.ApplicationScoped;
//import javax.json.JsonObject;
//import javax.json.spi.JsonProvider;
//import javax.websocket.Session;
//
//import com.eh.openshiftapp.model.Webcam;
//
//@ApplicationScoped
//public class CamSessionHandler {
//	private final Set<Session> sessions = new HashSet<Session>();
//	private final Map<String, Webcam> webcamMap = new HashMap<String, Webcam>();
//	public static final Webcam WEBCAM = new Webcam();
//
//	public void addSession(Session session) {
//		sessions.add(session);
//	}
//
//	public void removeSession(Session session) {
//		sessions.remove(session);
//	}
//
//	public void addWebcam(String clientIP, Webcam webcam) {
//		webcamMap.put(clientIP, webcam);
//	}
//
//	public Webcam getWebcam(String clientIP) {
//		return webcamMap.get(clientIP);
//	}
//
//	public void removeWebcam(String clientIP) {
//		webcamMap.remove(clientIP);
//	}
//
//	public JsonObject createAddMessage(Webcam webcam) {
//		JsonProvider provider = JsonProvider.provider();
//		JsonObject addMessage = provider.createObjectBuilder().add("action", "init").build();
//		if (webcam != null) {
//			addMessage = provider.createObjectBuilder().add("action", "webcam").add("clientIP", webcam.getClientIP())
//					.add("geoLocation", webcam.getGeoLocation()).add("blobString", webcam.getBlobString()).build();
//		}
//		return addMessage;
//	}
//
//	public void sendToAllConnectedSessions(JsonObject message) {
//		for (Session session : sessions) {
//			sendToSession(session, message);
//		}
//	}
//
//	public void sendToSession(Session session, JsonObject message) {
//		try {
//			session.getBasicRemote().sendText(message.toString());
//		} catch (IOException ex) {
//			sessions.remove(session);
//			System.out.println("CamSessionHandler Error: " + ex.getMessage());
//			// ex.printStackTrace();
//		}
//	}
//}
