package test.com.pe;

import static org.junit.Assert.*;


import org.junit.Test;

import pedido.com.pe.OrdendeCompra;
import pedido.com.pe.Usuario;

public class TestPedido {

	
	@Test
	public void test2(){
		OrdendeCompra oc=new OrdendeCompra();
		assertEquals(24.1*1.18, oc.CalcularMontoTotal(),0);
	}
	
}
