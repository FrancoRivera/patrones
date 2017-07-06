package test.com.pe;

import static org.junit.Assert.*;

import org.junit.Test;

import pedido.com.pe.OrdendeCompra;

public class TestOrdenCompra {

	@Test
	public void test() {
		OrdendeCompra oc=new OrdendeCompra();
		assertEquals(24.1, oc.CalcularImpuestos(),0);
	}

}
