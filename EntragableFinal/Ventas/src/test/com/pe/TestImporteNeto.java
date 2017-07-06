package test.com.pe;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import pedido.com.pe.*;

public class TestImporteNeto {
	@Test
	public void test3(){
		DocumentoDePago oc=new DocumentoDePago();
		assertEquals("", oc.verImporteNeto());
	}
	
}
