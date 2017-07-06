package test.com.pe;

import org.junit.Test;

import pedido.com.pe.Producto;

public class TestVerStock {
	@Test
	public void test2(){
		Producto p=new Producto(15);
		equals(p.verStock());
	}
}
