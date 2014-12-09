import entity.Logger;
import java.util.ArrayList;
import java.util.List;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class TestLogger {
    Logger logger1;
    Logger logger2;
    
    @Before
    public void setUp() {
        logger1 = new Logger("auser", "apass", "admin","aliasADMIN","Fname","Lname","HEHE");
        logger2 = new Logger("cuser", "cpass", "customer","aliasCUST","Fname","Lname","HOHO");
    }
    
    @Test
    public void testingInfoChanging(){
        logger1.setUsername("Buser");
        logger1.setPassword("Bpass");
        logger1.setType("customer");
        assertFalse("Username=auser, password=apass, type=admin".equals(logger1.toString()));
        assertEquals("Username=Buser, password=Bpass, type=customer", logger1.toString());
    }
    
    @Test
    public void testWtestDB(){
        //Putting the 2 person objects in an arraylist
        List<Logger> list = new ArrayList();
        list.add(logger1);
        list.add(logger2);
        
        //Initializing 2 new person objects to hold the data from the list
        Logger newlogger1;
        Logger newlogger2;
        newlogger1 = list.get(0);
        newlogger2 = list.get(1);
       
        assertEquals(2, list.size());
        assertThat(logger1, is(newlogger1));
        assertThat(logger2, is(newlogger2));
    }
}