package restCRUD;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class HandlerLogger implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        String response = "";
        int status = 200;
        String method = he.getRequestMethod().toUpperCase();
        String path = he.getRequestURI().getPath();
        String[] pathWork = path.split("/");
        switch (method) {
            case "GET":
                if (pathWork.length == 4) {
                    //Works with address/admin/:username/:password (no body)
                    //Returns : null if not found and json object if there is result1
                    System.out.println("GET Request: " + path);
                    response = RestFileServer.facade.authenticateUserViaJSON(pathWork[2], pathWork[3]);
                    if (response == null) {
                        response = "{\"error\": \"Incorrect information\"}";
                        status = 404;
                    }
                } else if (pathWork.length == 2) {
                    //Works with address/ (no body)
                    //Returns : null if not found and json list if there is result
                    System.out.println("GET Request (ALL) " + path);
                    response = RestFileServer.facade.getUsersAsJSON();
                } else {
                    response = "<h1>Bad Request</h1>Not supported.";
                    status = 404;
                }
                System.out.println("Result(GET ALL) was sent back");
                break;
            case "POST":
                System.out.println("POST Request: " + path);
                if (pathWork.length == 2) {
                    //Works with admin/ (POST)
                    //Body : {"username": "zxcasdawesad", "password": "sdfsdfasdsad","type": "admin",
                    //       "userAdmin": "sasas", "fname": "sas","lname": "sasd","adress": "asaas"}   
                    //Returns : null if wrong user input OR json if changed
                    
                   // String jsonQuery;
                    InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
                //    StringBuilder responseStrBuilder = new StringBuilder();
                    BufferedReader br = new BufferedReader(isr);
//                    while ((jsonQuery = br.readLine()) != null)
//                    responseStrBuilder.append(jsonQuery);
                            
                            
                    String jsonQuery= br.readLine();
                    br.close();
                    System.out.println("STRING PUT "+jsonQuery);
                    response = RestFileServer.facade.addUserViaJSON(jsonQuery);
                }
                else{
                    response = "{\"error\": \"Incorrect information\"}";
                }
                System.out.println("Result : " + response);
                break;
            case "PUT":
                System.out.println("PUT Request: " + path);
                if (pathWork.length == 2) {
                    //Works with admin/ (PUT)
                    //Body : {"username": "zxcasdawesad", "password": "sdfsdfasdsad","type": "admin"}
                    //Returns : null if wrong user input OR json if changed
                    InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
                    BufferedReader br = new BufferedReader(isr);
                    String jsonQuery = br.readLine();
                    br.close();
                    String methodResponse = RestFileServer.facade.editUserViaJson(jsonQuery);
                    if (!"Incorrect".equals(methodResponse)) {
                        response = methodResponse;
                    } else {
                        response = "{\"error\": \"Incorrect information\"}";
                    }
                } else if (pathWork.length == 3 && "password".equals(pathWork[2])) {
                    //Works with admin/password (PUT)
                    //Body : {"username": "zxcasdawesad", "oldPassword": "sdfsdfasdsad","newPassword": "ddasdasdasd"}
                    //Returns : 0=='not found' && '1'==success
                    InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
                    BufferedReader br = new BufferedReader(isr);
                    String jsonQuery = br.readLine();
                    br.close();
                    response = Integer.toString(RestFileServer.facade.changePasswordViaJson(jsonQuery));
                } else {
                    response = "<h1>Bad Request</h1>Not supported.";
                }
                System.out.println("Result : " + response);
                break;
            case "DELETE":
                System.out.println("DELETE Request: " + path);
                if (pathWork.length == 3 && "admin".equals(pathWork[1])) {
                    //Works with admin/:username (DELETE) (no body)
                    //Returns : 0=='not found' && '1'==success
                    response = Integer.toString(RestFileServer.facade.deleteUserViaJSON(pathWork[2]));
                } else {
                    status = 400;
                    response = "{\"error\": \"Not Supported\"}";
                }
                System.out.println("Result : " + response);
                break;
        }
        he.getResponseHeaders().add("Content-Type", "application/json");
        he.sendResponseHeaders(status, 0);
        try (OutputStream os = he.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}
