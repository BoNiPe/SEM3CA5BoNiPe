
import com.google.gson.Gson;
import entity.Logger;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import static org.hamcrest.CoreMatchers.is;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class TestFacade {

    FacadeMock facade = FacadeMock.getInstance();

    Logger logger1;
    Logger logger2;
    Logger logger3;
    Logger logger4;
    Logger logger5;

    String json;

    private Gson gson = new Gson();

    @Before
    public void setUp() {
        try {
            logger1 = new Logger(facade.hashMe("boyko"), facade.hashMe("password1"), "admin","a0","fnm0","lnm","add4");
            logger2 = new Logger(facade.hashMe("peter"), facade.hashMe("password2"), "admin","al1","fnm1","lnm","add3");
            logger3 = new Logger(facade.hashMe("nikolaj"), facade.hashMe("password3"), "admin","al2","fnm2","lnm","add7");
            logger4 = new Logger(facade.hashMe("kaloyan"), facade.hashMe("password4"), "customer","al3","fnm3","lnm","add3");
            logger5 = new Logger(facade.hashMe("sven"), facade.hashMe("password5"), "customer","al4","fnm4","lnm","add9");

            logger1.setId(1);
            logger2.setId(2);
            logger3.setId(3);
            logger4.setId(4);
            logger5.setId(5);

            facade.loggerList.add(logger1);
            facade.loggerList.add(logger2);
            facade.loggerList.add(logger3);
            facade.loggerList.add(logger4);
            facade.loggerList.add(logger5);
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(TestFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @After
    public void tearDown() {
        facade.loggerList.clear();
    }

    @Test
    public void testFacadeMockGetInstance() {
        assertEquals(java.lang.System.identityHashCode(facade),
                java.lang.System.identityHashCode(FacadeMock.getInstance()));
    }

    @Test
    public void testGetUsersAsJSON() {

        try {
            List<Logger> testList = new ArrayList();
            Logger testLogger1 = new Logger("boyko", "password1", "admin","a0","fnm0","lnm","add4");
            testLogger1.setUsername(facade.hashMe(testLogger1.getUsername()));
            testLogger1.setPassword(facade.hashMe(testLogger1.getPassword()));
            testLogger1.setId(1);
            testList.add(testLogger1);
            Logger testLogger2 = new Logger("peter", "password2", "admin","a0","fnm0","lnm","add4");
            testLogger2.setUsername(facade.hashMe(testLogger2.getUsername()));
            testLogger2.setPassword(facade.hashMe(testLogger2.getPassword()));
            testLogger2.setId(2);
            testList.add(testLogger2);
            Logger testLogger3 = new Logger("nikolaj", "password3", "admin","a0","fnm0","lnm","add4");
            testLogger3.setUsername(facade.hashMe(testLogger3.getUsername()));
            testLogger3.setPassword(facade.hashMe(testLogger3.getPassword()));
            testLogger3.setId(3);
            testList.add(testLogger3);
            Logger testLogger4 = new Logger("kaloyan", "password4", "customer","a0","fnm0","lnm","add4");
            testLogger4.setUsername(facade.hashMe(testLogger4.getUsername()));
            testLogger4.setPassword(facade.hashMe(testLogger4.getPassword()));
            testLogger4.setId(4);
            testList.add(testLogger4);
            Logger testLogger5 = new Logger("sven", "password5", "customer","a0","fnm0","lnm","add4");
            testLogger5.setUsername(facade.hashMe(testLogger5.getUsername()));
            testLogger5.setPassword(facade.hashMe(testLogger5.getPassword()));
            testLogger5.setId(5);
            testList.add(testLogger5);
            //Parsing
            List<userInformation> uiLis = new ArrayList();
            userInformation uiObject = new userInformation();
            for (Logger curLogger : testList) {
                uiObject.setType(curLogger.getType());
                uiLis.add(uiObject);
            }
            assertThat(gson.toJson(uiLis), is(facade.getUsersAsJSON()));
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(TestFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testAuthenticateUserViaJSON() {
        try {
            String username = "boyko";
            String password = "password1";
            Logger testLogger2 = new Logger(facade.hashMe("boyko"), facade.hashMe("password1"), "admin","a0","fnm0","lnm","add4");
            testLogger2.setId(1);
            userInformation ui = new userInformation();
            ui.setType(testLogger2.getType());
            assertEquals(gson.toJson(ui), facade.authenticateUserViaJSON(username, password));

        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(TestFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testAddUserViaJSON() {
        try {
            Logger expectedUser = new Logger("peter", "password2", "admin","a0","fnm0","lnm","add4");
            String jsonObject = gson.toJson(expectedUser);
            Logger actualUser = gson.fromJson(facade.addUserViaJSON(jsonObject), Logger.class);
            expectedUser.setUsername(facade.hashMe(expectedUser.getUsername()));
            expectedUser.setPassword(facade.hashMe(expectedUser.getPassword()));
            assertEquals(expectedUser.getUsername(), actualUser.getUsername());
            assertEquals(expectedUser.getPassword(), actualUser.getPassword());
            assertEquals(expectedUser.getType(), actualUser.getType());
            assertEquals(expectedUser.getId(), actualUser.getId());
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(TestFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @Test
    public void testChangePasswordViaJson()
    {
        userPasswordChanger upc = new userPasswordChanger();
        upc.setUsername("boyko");
        upc.setOldPassword("password1");
        upc.setNewPassword("pushaciPushaci");
        String jsonObject = gson.toJson(upc);
        assertEquals((Integer) 1,facade.changePasswordViaJson(jsonObject));
    }
    @Test
    public void testEditUserViaJson() {
        try {
            Logger changedUser = new Logger("nikolaj", "password3", "customer","a0","fnm0","lnm","add4");
            Logger actualUser = gson.fromJson(facade.editUserViaJson(gson.toJson(changedUser)), Logger.class);
            changedUser.setUsername(facade.hashMe(changedUser.getUsername()));
            changedUser.setPassword(facade.hashMe(changedUser.getPassword()));
            assertEquals(changedUser.getType(), actualUser.getType());
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(TestFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testDeleteUserViaJSON() {
        assertEquals((Integer) 1, facade.deleteUserViaJSON("boyko"));
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
