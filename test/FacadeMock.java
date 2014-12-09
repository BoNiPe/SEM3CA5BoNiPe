
import com.google.gson.Gson;
import entity.Logger;
import facade.FacadeLogicInterface;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

public class FacadeMock implements FacadeLogicInterface {

    private final Gson gson = new Gson();
    public static List<Logger> loggerList = new ArrayList();

    //Singleton
    private static FacadeMock instance = null;

    protected FacadeMock() {
        // Exists only to defeat instantiation.
    }

    public static FacadeMock getInstance() {
        if (instance == null) {
            instance = new FacadeMock();
        }
        return instance;
    }

    @Override
    public String getUsersAsJSON() {
        List<userInformation> uiLis = new ArrayList();
        userInformation uiObject = new userInformation();
        for (Logger curLogger : loggerList) {
            System.out.println("curLogger.getType() : " + curLogger.getType());
            uiObject.setType(curLogger.getType());
            uiLis.add(uiObject);
        }
        return gson.toJson(uiLis);
    }

    @Override
    public String authenticateUserViaJSON(String username, String password) {
        for (Logger loggerList1 : loggerList) {
            try {
                if (loggerList1.getUsername().equals(hashMe(username))
                        && loggerList1.getPassword().equals(hashMe(password))) {
                    userInformation ui = new userInformation();
                    ui.setType(loggerList1.getType());
                    return gson.toJson(ui);
                }
            } catch (NoSuchAlgorithmException ex) {
                java.util.logging.Logger.getLogger(FacadeMock.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }

    @Override
    public String addUserViaJSON(String json) {
        try {
            Logger newUsah = gson.fromJson(json, Logger.class);
            newUsah.setUsername(hashMe(newUsah.getUsername()));
            newUsah.setPassword(hashMe(newUsah.getPassword()));
            if (!loggerList.contains(newUsah)) {
                loggerList.add(newUsah);
                return gson.toJson(newUsah);
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeMock.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public String editUserViaJson(String json) {
        try {
            Logger newUsah = gson.fromJson(json, Logger.class);
            newUsah.setUsername(hashMe(newUsah.getUsername()));
            newUsah.setPassword(hashMe(newUsah.getPassword()));
            for (Logger loggerList1 : loggerList) {
                if (loggerList1.getUsername().equals(newUsah.getUsername())
                        && loggerList1.getPassword().equals(newUsah.getPassword())) {
                    loggerList1.setType(newUsah.getType());
                    userInformation ui = new userInformation();
                    ui.setType(loggerList1.getType());
                    return gson.toJson(ui);
                }
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeMock.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public Integer changePasswordViaJson(String json) {
        try {
            userPasswordChanger newUsah = gson.fromJson(json, userPasswordChanger.class);
            newUsah.setUsername(hashMe(newUsah.getUsername()));
            newUsah.setOldPassword(hashMe(newUsah.getOldPassword()));
            for (Logger loggerList1 : loggerList) {
                if (loggerList1.getUsername().equals(newUsah.getUsername())
                        && loggerList1.getPassword().equals(newUsah.getOldPassword())) {
                    loggerList1.setPassword(newUsah.getNewPassword());
                    return 1;
                }
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeMock.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }

    @Override
    public Integer deleteUserViaJSON(String username) {
        for (Logger loggerList1 : loggerList) {
            try {
                if (loggerList1.getUsername().equals(hashMe(username))) {
                    loggerList.remove(loggerList1);
                    return 1;
                }
            } catch (NoSuchAlgorithmException ex) {
                java.util.logging.Logger.getLogger(FacadeMock.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }

    @Override
    public String hashMe(String toBeHashed) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(toBeHashed.getBytes());
        byte byteData[] = md.digest();
        //convert the byte to hex format method 1
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        toBeHashed = sb.toString();
        return toBeHashed;
    }

    class userPasswordChanger {

        private String username;
        private String oldPassword;
        private String newPassword;

        public void setUsername(String username) {
            this.username = username;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }

        public String getUsername() {
            return username;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public String getOldPassword() {
            return oldPassword;
        }
    }

    class userInformation {

        private String type;

        public void setType(String type) {
            this.type = type;
        }
    }
}
