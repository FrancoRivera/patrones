package test.com.pe;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ TestActualizar.class, TestImporteNeto.class, TestLogin.class, 
	TestOrdenCompra.class, TestPedido.class,
		TestVerStock.class })
public class AllTests {

}
