package facade;

import com.google.gson.Gson;
import entity.Logger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FacadeLogic implements FacadeLogicInterface {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("JPA_TestingPU");
    EntityManager em = emf.createEntityManager();
    EntityTransaction tr;
    private Gson gson = new Gson();

    //Singleton
    private static FacadeLogic instance = null;

    protected FacadeLogic() {
        // Exists only to defeat instantiation.
    }

    public static FacadeLogic getInstance() {
        if (instance == null) {
            instance = new FacadeLogic();
        }
        return instance;
    }

    private void initializeTransactions() {
        tr = em.getTransaction();
    }

    @Override
    public String getUsersAsJSON() {
        //Works with address/admin/:username/:password (no body)
        //Returns : null if not found and json object if there is result
        Query query = em.createQuery("SELECT a FROM Logger a");
        List<Logger> loggerList = (List<Logger>) query.getResultList();
        return gson.toJson(loggerList);
    }

    @Override
    public String authenticateUserViaJSON(String username, String password) {
        try {
            Query query = em.createQuery("SELECT a FROM Logger a WHERE a.username='" + hashMe(username) + "' AND a.password='" + hashMe(password) + "'");
            List<Logger> nesquick = (List<Logger>) query.getResultList();
            if (nesquick.size() == 1) {
                return gson.toJson(nesquick.get(0));
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeLogic.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public String addUserViaJSON(String json) {
        try {
            System.out.println("HELLO FROM ADD USER");
            Logger p = gson.fromJson(json, Logger.class);
            Query query = em.createQuery("SELECT a FROM Logger a WHERE a.username ='" + hashMe(p.getUsername()) + "'");
            List<Logger> nesquick = (List<Logger>) query.getResultList();
            System.out.println("SHOULD BE EMPTY "+nesquick.isEmpty() );
            if (nesquick.isEmpty() && (p.getType().equalsIgnoreCase("admin")
                    || p.getType().equalsIgnoreCase("customer"))) {
                System.out.println("I AM IN");
                initializeTransactions();
                tr.begin();
                p.setUsername(hashMe(p.getUsername()));
                p.setPassword(hashMe(p.getPassword()));
                p.setType(p.getType());
                p.setUserAlias(p.getUserAlias());
                p.setFname(p.getFname());
                p.setLname(p.getLname());
                p.setAdress(p.getAdress());
                em.persist(p); //flush could be used - commits auto to DB
                tr.commit();
                return gson.toJson(p);
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeLogic.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "Incorrect";
    }

    @Override
    public String editUserViaJson(String json) {
        Logger p = gson.fromJson(json, Logger.class);
        Query query = em.createQuery("SELECT a FROM Logger a WHERE a.username='" + p.getUsername() + "' AND a.password='" + p.getPassword() + "'");
        List<Logger> nesquick = (List<Logger>) query.getResultList();
        if (!nesquick.isEmpty() && nesquick.size() == 1) {
            initializeTransactions();
            tr.begin();
            Logger a = em.find(Logger.class, nesquick.get(0).getId());
            a.setType(p.getType());
            a.setUserAlias(p.getUserAlias());
            a.setFname(p.getFname());
            a.setLname(p.getLname());
            a.setAdress(p.getAdress());
            em.persist(a);
            tr.commit();
            return gson.toJson(a);
        }
        return "Incorrect";
    }

    @Override
    public Integer changePasswordViaJson(String json) {
        try {
            userPasswordChanger p = gson.fromJson(json, userPasswordChanger.class);
            Query query = em.createQuery("SELECT a FROM Logger a WHERE a.username='" + hashMe(p.getUsername()) + "' AND a.password='" + hashMe(p.getOldPassword()) + "'");
            List<Logger> nesquick = (List<Logger>) query.getResultList();
            if (!nesquick.isEmpty() && nesquick.size() == 1) {
                initializeTransactions();
                tr.begin();
                Query query2 = em.createQuery("UPDATE Logger logger SET logger.password = :password "
                        + "WHERE logger.username = :username");
                query2.setParameter("password", hashMe(p.getNewPassword()));
                query2.setParameter("username", nesquick.get(0).getUsername());
                int updateCount = query2.executeUpdate();
                System.out.println("UPDATE count to JPAdb : " + updateCount);
                tr.commit();
                return 1;
            }
        } catch (NoSuchAlgorithmException ex) {
            java.util.logging.Logger.getLogger(FacadeLogic.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }

    @Override
    public Integer deleteUserViaJSON(String username) {
        Query query = em.createQuery("SELECT a FROM Logger a WHERE a.username='" + username + "'");
        List<Logger> nesquick = (List<Logger>) query.getResultList();
        if (!nesquick.isEmpty() && nesquick.size() == 1) {
            initializeTransactions();
            tr.begin();
            em.remove(nesquick.get(0));
            tr.commit();
            return 1;
        }
        return 0;
    }

    @Override
    public String hashMe(String hashed) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(hashed.getBytes());
        byte byteData[] = md.digest();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        hashed = sb.toString();
        return hashed;
    }

    public void testingCode() {
//        Logger test = new Logger("tester1", "tester1", "customer");
//        addUserViaJSON(gson.toJson(test, Logger.class));
//        System.out.println(checkIfUsernameAndPasswordExist("97c7403d9bf0573235766d0f6fdeff94b3a26199e5c17f62e6891d29749b2f1e", "5906ac361a137e2j286465cd6588ebb5ac3f5ae955001100bc41577c3d751764"));
//        System.out.println(deleteUserFromJSON(3));
//        System.out.println(getUserAsJSON(3));
//        System.out.println(getUsersAsJSON());
//        System.out.println("GIVIN YOU ALL " + getUsersAsJSON());
    }

//    public static void main(String[] args) {
//        new FacadeLogic().testingCode();
//    }
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
        private String userAlias;
        private String fname;
        private String lname;
        private String adress;

        public void setUserAlias(String userAlias) {
            this.userAlias = userAlias;
        }

        public void setFname(String fname) {
            this.fname = fname;
        }

        public void setLname(String lname) {
            this.lname = lname;
        }

        public void setAdress(String adress) {
            this.adress = adress;
        }

        public void setType(String type) {
            this.type = type;
        }
    }
}
