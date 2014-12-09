package facade;

import java.security.NoSuchAlgorithmException;

public interface FacadeLogicInterface {

    String addUserViaJSON(String json);

    Integer deleteUserViaJSON(String username);

    String authenticateUserViaJSON(String username, String password);

    String getUsersAsJSON();
    
    String editUserViaJson(String json);
    
    Integer changePasswordViaJson(String json);
    
    String hashMe(String hashed) throws NoSuchAlgorithmException;

}
