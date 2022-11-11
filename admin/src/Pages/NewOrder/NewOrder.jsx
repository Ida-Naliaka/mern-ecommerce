import { useEffect, useState } from "react";
import "./NewOrder.css";
import axios from "axios";
import { DeleteOutline, Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addProducttoCart, removeProductfromCart } from "../../Redux/cartRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@material-ui/data-grid";
import { Avatar } from "@material-ui/core";
import { AddOrder } from "../../Redux/apiCalls";

export default function NewOrder() {
  const [orderData, setOrderData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Enter Search Item");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(
        `/api/products/newOrder?search=${search}`,
        config
      );
      res.data.length > 0
        ? setSearchResult(res.data)
        : toast.warning("No results found");
    } catch (error) {
      toast.error("Failed to Load the Search Results");
    }
  };

  useEffect(() => {
    const total = product.price * quantity;
    quantity > 0 &&
      setOrderData({
        _id: product._id,
        Title: product.title,
        Price: product.price,
        Quantity: quantity,
        Total: total,
      });
    // eslint-disable-next-line
  }, [product, quantity]);

  const handleAddProduct = () => {
    try {
      dispatch(addProducttoCart(orderData));
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      dispatch(removeProductfromCart(productId));
    } catch (error) {
      toast.error("Error Occured in deleting product");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return <div className="orderListItem">{params.row.Title}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
      renderCell: (params) => {
        return <div className="orderListItem">{params.row.Quantity}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.Price * params.row.Quantity}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const handleSubmit = () => {
    const userId = user._id;
    const products = cart.products.map((item) => ({
      productId: item._id,
      quantity: item._Quantity,
    }));
    const amount = cart.total;
    const address = "in-store";

    dispatch(AddOrder({ userId, products, amount, address }, dispatch));
    //toast.success(`order made successfully. Order number:${res.data._id}`)
    setOrderData([]);
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Order</h1>
      <form
        className="addProductForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <div className="searchcontainer">
          <label>Search Product</label>
          <input
            placeholder="Search by name or brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            onClick={handleSearch}
            style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
          />
        </div>

        {searchResult.length > 0 ? (
          <>
            <div style={{ marginTop: "10px" }}>
              <b>Search Results</b>
            </div>
            {searchResult.map((p) => (
              <div key={p._id}>
                <div className="searchParent" onClick={() => setProduct(p)}>
                  <Avatar alt={p.title} src={p.img} />
                  <div className="searchresult">
                    <p style={{ fontSize: "18px" }}>{p.title}</p>
                    <p style={{ fontSize: "15px" }}>
                      <em>{p.brand}</em>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
        <div className="searchcontainer">
          <label>Quantity</label>
          <input
            name="size"
            value={quantity}
            type="number"
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity([e.target.value])}
          />
        </div>
        <button type="submit" className="addProductButton">
          Add Product to Cart
        </button>
      </form>
      <div className="orderList">
        <DataGrid
          rows={cart.products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
      <button onClick={() => handleSubmit()} className="addProductButton">
        Submit Order of Ksh.{cart.total}
      </button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
