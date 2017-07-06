function validarLogin() {
    if (sessionStorage.getItem('user') != null)
        return true;
    else {
        return false }
}
 $(document).ready(function() {

        if (validarLogin()) {


            $("#user").html(sessionStorage.getItem('user'));
            $("#dni").html(sessionStorage.getItem('dni'));
            $("#place").html(sessionStorage.getItem('place'));
            $("#phone").html(sessionStorage.getItem('phone'));
        }

        mi_id = setInterval(function() {
            if (sessionStorage.getItem("yolo") != null) alert("yes")
            else {
                console.log("nah")
            }
        }, 100)
    })

    var carrito = [];
    $(document).ready(function() {
        if (sessionStorage.getItem("carrito") != null)
            carrito = JSON.parse(sessionStorage.getItem("carrito"))
        ActualizarCarrito()
    })

    function Producto(casero, qty, producto, precio, subtotal) {
        this.casero = casero;
        this.qty = qty;
        this.producto = producto;
        this.precio = precio;
        this.subtotal = subtotal;

    }


function ActualizarCarrito() {
        var total = 0;
        $(".carrito_lista").html("")
        $(".productos_carrito").html("")
        for (var i = 0; i < carrito.length; i++) {
            var str = "<div class='row'><div class='col-xs-1'></div><div class='col-xs-5'>" + carrito[i].producto + "</div><div class='col-xs-3'> S./ " + carrito[i].subtotal + "</div></div>"
            var str_prod = "<div class='margin_10'></div><div class='row'><div class='col-xs-1'></div><div class='col-xs-2'>" + carrito[i].casero + "</div><div class='col-xs-3'>" + carrito[i].producto + "</div><div class='col-xs-2'>" + carrito[i].qty + "</div><div class='col-xs-2'>" + carrito[i].subtotal + "</div><div class='col-xs-1'> <button type='button' class='btn btn-danger remove_item' pk='" + i + "'><span class='glyphicon glyphicon-remove'></span></button> </div></div>"
            $(".carrito_lista").append(str)
            $(".productos_carrito").append(str_prod)
            total += parseFloat(carrito[i].subtotal)
        }
        $("#total_carrito").html("S./ " + total.toFixed(2))
        $("#carrito_total").html("S./ " + total.toFixed(2))
        if (carrito.length > 0 ) $("#pagar_carrito").removeAttr("disabled");
        else{ $("#pagar_carrito").attr("disabled", "disabled");}
    }

    $("#cerrar_carrito").click(function() {
        $(".carrito").hide("slide", {
            direction: "down"
        }, "slow");
    })

    $(".ver_carrito").click(function() {
        $(".carrito").show("slide", {
            direction: "down"
        }, "slow");
    })
    $(".ver_pedidos").click(function() {
        $(".pedidos").show("slide", {
            direction: "down"
        }, "slow");
    })
    $("#cerrar_pedidos").click(function() {
        $(".pedidos").hide("slide", {
            direction: "down"
        }, "slow");
    })

    $(".ver_home_usuario").click(function() {
 		$(".perfil_usuario").hide("slide", {
            direction: "right"
        }, "slow");
        $(".home_usuario").show("slide", {
            direction: "left"
        }, "slow");
    })

   	$(".ver_home_comerciante").click(function() {
   		  $(".perfil_comerciante").hide("slide", {
            direction: "right"
        }, "slow");
    	$(".home_comerciante").show("slide", {
            direction: "left"
        }, "slow");
    })

    $("#ver_perfil_usuario").click(function() {
        $(".perfil_usuario").show("slide", {
            direction: "right"
        }, "slow");
    })
       $("#ver_perfil_comerciante").click(function() {
        $(".perfil_comerciante").show("slide", {
            direction: "right"
        }, "slow");
    })
           $("#cerrar_checkout").click(function(){
      	  $(".checkout").hide("slide", {
            direction: "down"
        }, "slow");
      	
      })

      $("#pagar_carrito").click(function(){

      	 $(".checkout").show("slide", {
            direction: "down"
        }, "slow", function(){
        	      		$(".carrito").hide("slide", {
            direction: "down"
        }, "slow")
        }

        );

      	
      })

    $("#hacer_pedidos").click(function() {
        $(".home_usuario").hide("slide", {
            direction: "left"
        }, "slow");
    })

    $(document).on("click", ".remove_item", function() {
        if ($(this).attr("pk") > -1) {
            carrito.splice($(this).attr("pk"), 1);
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
            ActualizarCarrito()
        }
    })

    $("#add_2_cart").click(function() {
        casero = $("#tu_casero").html()
        qty = parseFloat($("#qty").val())
        producto = $("#tu_producto").html()
        precio = parseFloat($("#tu_precio").html().substring(3))
        subtotal = parseFloat($("#sub_total").html())
        nueva_compra = new Producto(casero, qty, producto, precio, subtotal);
        carrito.push(nueva_compra)
        sessionStorage.setItem("carrito", JSON.stringify(carrito))

        $("#cancelar_cantidades").click();
        $("#cancelar").click();
        ActualizarCarrito();

    })


    $("#qty").keyup(function() {
        $("#sub_total").html((parseFloat($("#qty").val()) * parseFloat($("#tu_precio").html().substring(3))).toFixed(2))
    })
    $("#buscar").click(function() {
        $("#producto").keydown()
    })

    $(".comprar_luis").click(function() {
        $("#tu_casero").html("Luis")
        $("#tu_precio").html($("#precio_luis").html())
        $("#tu_producto").html($("#producto").val())
        $(".cantidades").show("slide", {
            direction: "down"
        }, "slow");
    })

    $(".comprar_pedrito").click(function() {
        $("#tu_casero").html("Pedrito")
        $("#tu_precio").html($("#precio_pedrito").html())
        $("#tu_producto").html($("#producto").val())
        $(".cantidades").show("slide", {
            direction: "down"
        }, "slow");
    })

    $(".comprar_juanita").click(function() {
        $("#tu_casero").html("Juanita")
        $("#tu_precio").html($("#precio_juanita").html())
        $("#tu_producto").html($("#producto").val())
        $(".cantidades").show("slide", {
            direction: "down"
        }, "slow");
    })

    $("#cancelar_cantidades").click(function() {
        $(".cantidades").hide("slide", {
            direction: "down"
        }, "slow");
    })

    $("#cancelar").click(function() {
        $(".opciones").hide("slide", {
            direction: "down"
        }, "slow");
    })

    usuario = sessionStorage.getItem('user')

    $(function() {
        var availableTags = [
            "Manzanas",
            "Peras",
            "Platanos",
            "Cebollas",
            "Azucar",
            "Tomates",
            "Papa amarilla",
            "Queso",
            "Limones",
            "Carne de Vaca",
            "Carne de Chancho",
            "Apio",
            "Poro",
            "Tallarines",
            "Papa blanca",
            "Ajos"
        ];
        $("#producto").autocomplete({
            source: availableTags,
            select: function(event, ui) {
                $("#precio_juanita").html("S/. " + (Math.random() * 10).toFixed(2))
                $("#precio_luis").html("S/. " + (Math.random() * 10).toFixed(2))
                $("#precio_pedrito").html("S/. " + (Math.random() * 10).toFixed(2))
                $(".opciones").show("slide", {
                    direction: "down"
                }, "slow");

            }
        });
    });