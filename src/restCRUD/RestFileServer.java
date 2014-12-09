package restCRUD;

import com.sun.net.httpserver.HttpServer;
import facade.FacadeLogic;
import java.io.IOException;
import java.net.InetSocketAddress;

public class RestFileServer {

    static int port = 8080;
    static String ip = "localhost";
    static String publicFolder = "../src/public/";
  //  static String startFile = "index.html";
    static String filesUri = "/pages";

    static FacadeLogic facade;

    public void run() throws IOException {
        facade = FacadeLogic.getInstance();

        //Initialize HTTP Server
        HttpServer server = HttpServer.create(new InetSocketAddress(ip, port), 0);
        //REST Routes
        server.createContext("/admin", new HandlerLogger());
        //HTTP Server Routes
        server.createContext(filesUri, new HandlerFileServer());
        //Start HTTP Server
        server.setExecutor(null); 
        server.start();
        System.out.println("Server started, listening on port: " + port);
    }

    public static void main(String[] args) throws IOException {
        if (args.length >= 3) {
            port = Integer.parseInt(args[0]);
            ip = args[1];
            publicFolder = args[2];
        }
        
        new RestFileServer().run();
    }
}
