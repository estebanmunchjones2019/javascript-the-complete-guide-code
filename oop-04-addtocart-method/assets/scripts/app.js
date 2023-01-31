class Component {
    constructor(sound){
        this.sound = sound;
    }
    makeSound(){
        console.log(this.sound);
    }
}

class Cart extends Component {

    constructor(sound){
        super(sound);
        // some other logic here, assigning new props
    }

    items = [];
    setCartItems(itemsArray){
        this.items = itemsArray // reassigns the prop to a new array
        // more logic here! like updating the DOM Node displaying the total price
        console.log('running the setter!')
    }

    get total() {
        return this.items.reduce((previous,current) => {
            // debugger;
            return previous + current.price;
        },0)
    }
  }
  
  class App {
      static playWithCart(){
          this.cart = new Cart('boooo!');
          this.cart.setCartItems([{ name: 'banana', price: 10} , { name: 'bread', price: 20 }]); // ✅ triggers the setter
      console.log(this.cart.items);
    //   debugger;
      console.log(this.cart.total);
      this.cart.makeSound();
      }
  }

  App.playWithCart();
