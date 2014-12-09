package restCRUD;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

public class HandlerFileServer implements HttpHandler {

    private String publicFolder = RestFileServer.publicFolder;

        @Override
        public void handle(HttpExchange he) throws IOException {
            int responseCode = 500;
            //Set initial error values if an un expected problem occurs
            String errorMsg = null;
            byte[] bytesToSend = "<h1>Internal Error </h1><p>We are sorry. The server encountered an unexpected problem</p>".getBytes();
            String requestedFile = he.getRequestURI().toString();
            String f = requestedFile.substring(requestedFile.lastIndexOf("/") + 1);
            try
            {
                File file = new File(publicFolder + f);
                System.out.println(publicFolder + f);
                bytesToSend = new byte[(int) file.length()];
                BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
                bis.read(bytesToSend, 0, bytesToSend.length);
                responseCode = 200;
            } catch (Exception e)
            {
                responseCode = 404;
                errorMsg = "<h1>404 Not Found</h1>No context found for request";
            }
            if (responseCode == 200)
            {
                Headers h = he.getResponseHeaders();
                h.set("Content-Type", "application/java-archive");
            } else
            {
                bytesToSend = errorMsg.getBytes();
            }
            he.sendResponseHeaders(responseCode, bytesToSend.length);
            try (OutputStream os = he.getResponseBody())
            {
                os.write(bytesToSend, 0, bytesToSend.length);
            }
        }



    }
