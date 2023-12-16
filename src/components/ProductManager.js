import { promises as fs } from "fs"

//creamos la ruta

export default class ProductManager {
    constructor (){
        this.path = "./productos.txt"
        this.prod = [] //este arreglo vacío es donde se va pushear los productos primero antes de pasar a nuestro .txt
    }

    //id autoincrementable
    static id = 0

    //creando un método que funciona de forma cincronica por medio de una promesa
    //no colocamos promises porque ya lo importamos

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        //llamar a la propiedad y incrementarle el id
        ProductManager.id++

        //objeto - porque cuando formamos un onj y el nombre del atributo y el valor es = se puede simplificar
        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price, 
            thumbnail,
            code,
            stock
        }
        this.prod.push(newProduct)

        //no colocamos promises porque ya lo importamos
                                      //TRANSF. el obj en string 
        await fs.writeFile(this.path, JSON.stringify(this.prod))
    };

    readProducts = async () => {
        let result = await fs.readFile(this.path, "utf-8")
        return JSON.parse(result)
    }
    //metodo getProducts para consulta - leer prod.txt y devolver el arreglo en la terminal
    getProducts = async () => {
        let results = await this.readProducts()
                    //TRANSF string en objeto
        return console.log(results)
    }

//consultar un producto por su ID

getProductById = async (id) => { //esta func. tiene que devolver el prod. filtrado
    let resultId = await this.readProducts()
    !resultId.find(product => product.id === id)? console.log('404- Not Found'): console.log(resultId.find((product) => product.id === id));
    }

    deleteProduct = async (id) => {
        let resultId = await this.readProducts();
        let productFilter = resultId.filter(products => productos.id != id)
        await fs.writeFile (this.path, JSON.stringify(productFilter))
        console.log('producto Eliminado')
    };

    updateProducts = async ({id, ...productos}) =>{
        await this.deleteProduct(id);
        let produtOld = await this.readProducts()

        let productMod = [{id, ...productos}, ...produtOld];
        await fs.writeFile(this.path,JSON.stringify(productMod));
    };
}

//const productos = new ProductManager();

/* productos.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25 )
productos.addProduct("producto2 prueba", "Este es un producto prueba2", 300, "sin imagen", "abc1234", 80 )
productos.addProduct("producto3 prueba", "Este es un producto prueba3", 400, "sin imagen", "abc12345", 30 )
productos.addProduct("producto4 prueba", "Este es un producto prueba4", 500, "sin imagen", "abc12346", 85 )
productos.addProduct("producto5 prueba", "Este es un producto prueba5", 600, "sin imagen", "abc12347", 55 )
productos.addProduct("producto6 prueba", "Este es un producto prueba6", 700, "sin imagen", "abc12348", 60 )
productos.addProduct("producto7 prueba", "Este es un producto prueba7", 800, "sin imagen", "abc12349", 88 )
productos.addProduct("producto8 prueba", "Este es un producto prueba8", 3900, "sin imagen", "abc123410", 90 )
productos.addProduct("producto9 prueba", "Este es un producto prueba9", 3400, "sin imagen", "abc123411", 78 )
productos.addProduct("producto10 prueba", "Este es un producto prueba10", 5300, "sin imagen", "abc123412", 60 )
 */


//productos.getProducts()
//productos.getProductById(3)
//productos.deleteProduct(1)

/* productos.updateProducts({
            title: "producto Modificado",
            description: "Este es un producto modificado",
            price: 4500,
            thumbnail: "sin imagen",
            code: 'abc1123',
            stock:5,
            id: 2
    }) */