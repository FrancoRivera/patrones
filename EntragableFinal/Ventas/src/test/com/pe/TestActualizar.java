package test.com.pe;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import pedido.com.pe.*;

public class TestActualizar {
	@Test
	public void test2(){
		Producto p=new Producto(15);
		equals(p.actualizarStock());
	}
}
