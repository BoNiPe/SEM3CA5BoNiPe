//package jpa_testing;
//
//import entity.Logger;
//import facade.FacadeLogic;
//import javax.persistence.EntityManager;
//import javax.persistence.EntityManagerFactory;
//import javax.persistence.Persistence;
//
//public class JPA_Testing {
//
//    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("JPA_TestingPU");
//    static EntityManager em = emf.createEntityManager();
//    static FacadeLogic facade;
//
//    public static void main(String[] a) throws Exception {
//        facade = FacadeLogic.getInstance();
//        
//        em.getTransaction().begin();
//
//        Logger logger1 = new Logger("bobkoobobkoo", "password", "admin","valaInPrison","Boyko","Koloop","Slovakia");
//        Logger logger2 = new Logger("ToPeter", "password2", "customer","dragon","Peter","Sakula","Bulgaria");
//        Logger logger3 = new Logger("Nikolaj", "password3", "customer","dance","Nicola","Pestova","Sweeden");
//     
//        
//        logger1.setUsername(facade.hashMe(logger1.getUsername()));
//        logger1.setPassword(facade.hashMe(logger1.getPassword()));
//        
//        logger2.setUsername(facade.hashMe(logger2.getUsername()));
//        logger2.setPassword(facade.hashMe(logger2.getPassword()));
//        
//        logger3.setUsername(facade.hashMe(logger3.getUsername()));
//        logger3.setPassword(facade.hashMe(logger3.getPassword()));
//        
//        em.persist(logger1);
//        em.persist(logger2);
//        em.persist(logger3);
//
//        em.flush();
//
//        em.getTransaction().commit();
//        em.close();
//        emf.close();
//    }
//}
