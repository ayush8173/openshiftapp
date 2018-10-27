package com.eh.openshiftapp.utility;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.concurrent.TimeUnit;;

public class ApplicationUtility {

	public static void appendKeylogs(String pressedKey, StringBuffer keylogsBuffer, long previousTimeMillis,
			long currentTimeMillis) {
		if (previousTimeMillis == 0) {
			keylogsBuffer.append(pressedKey);
		} else {
			long duration = currentTimeMillis - previousTimeMillis;
			long diffInSeconds = TimeUnit.MILLISECONDS.toSeconds(duration);
			if (diffInSeconds <= 2) {
				keylogsBuffer.append(pressedKey);
			} else if (diffInSeconds > 2 && diffInSeconds <= 5) {
				keylogsBuffer.append(" ");
				keylogsBuffer.append(pressedKey);
			} else if (diffInSeconds > 5 && diffInSeconds <= 10) {
				keylogsBuffer.append("  ");
				keylogsBuffer.append(pressedKey);
			} else if (diffInSeconds > 10 && diffInSeconds <= 30) {
				keylogsBuffer.append("   ");
				keylogsBuffer.append(pressedKey);
			} else if (diffInSeconds > 30 && diffInSeconds <= 60) {
				keylogsBuffer.append("     ");
				keylogsBuffer.append(pressedKey);
			} else {
				keylogsBuffer.append("          ");
				keylogsBuffer.append(pressedKey);
			}
		}
	}

	public static String convertToTitleCase(String text) {
		if (text == null || text.isEmpty()) {
			return text;
		}

		StringBuilder converted = new StringBuilder();

		boolean convertNext = true;
		for (char ch : text.toCharArray()) {
			if (Character.isSpaceChar(ch)) {
				convertNext = true;
			} else if (convertNext) {
				ch = Character.toTitleCase(ch);
				convertNext = false;
			} else {
				ch = Character.toLowerCase(ch);
			}
			converted.append(ch);
		}

		return converted.toString();
	}

	public static String getBlobToBase64String(Blob blob) {
		String bookImage = null;
		try {
			InputStream inputStream = blob.getBinaryStream();
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			byte[] buffer = new byte[4096];
			int bytesRead = -1;

			while ((bytesRead = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, bytesRead);
			}

			byte[] imageBytes = outputStream.toByteArray();
			bookImage = Base64.getEncoder().encodeToString(imageBytes);

			inputStream.close();
			outputStream.close();

		} catch (IOException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bookImage;
	}

	public static void main(String[] args) {

	}
}
