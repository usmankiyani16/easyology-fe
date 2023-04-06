import printIcon from "../../../assets/icons/layout/print.png";
import AddUser from "../../../assets/icons/layout/adduser.png";
import QRicon from "../../../assets/icons/layout/QR.png";
import ExtendBtn from "../../../assets/icons/layout/extendbtn.png";
import Laptop from "../../../assets/images/laptop_img.png";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./invoice.scss";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { preProcessFile } from "typescript";

const Invoice = (props: {
  item1: string;
  item2: string;
  item3: string;
  price: any;
  pricetotal: any;
  total_discount: any;
  discount: any;
  sales_tax: any;
  Total: any;
}) => {
  return (
    <div className="invoice">
      <div className="container">
        {/*  ---------------top-------------- */}

        <div className="printicon">
          <div className="extendbtn">
            {" "}
            <img src={ExtendBtn} />
          </div>
          <div className="printbtn">
            <img src={printIcon} />
          </div>
          <div className="onholdbtn">
            <button className="onhold">
              <p>on hold (</p>
              <p className="number">no</p>
              <p>)</p>
            </button>
          </div>
        </div>

        {/* ------------title and search--------------- */}

        <div className="title_search">
          <div className="head">
            <h1>Invoice # 5837</h1>
            <div className="h2_h3">
              <h2>Customer Type:</h2>
              <h3>Wholesaler</h3>
            </div>
          </div>

          <div className="search">
            <Input
              type="search"
              placeholder="Search Customer"
              prefix={<SearchOutlined />}
              className="searchbar"
            />
            <img className="adduser" src={AddUser} />
          </div>
        </div>

        {/*  ------------promo and product---------------- */}

        <div className="productID">
          <div className="promocode">
            {" "}
            <Input type="search" placeholder="Promo Code" />
          </div>
          <div className="applybtn">
            {" "}
            <button>Apply</button>
          </div>
          <Input
            type="search"
            placeholder="Product ID"
            prefix={<SearchOutlined />}
            className="product"
          />

          <img className="QRicon" src={QRicon} />
        </div>

        {/*  -----------item_Qty_Price---------------- */}

        <div className="item_Qty_Price">
          <h1>Item</h1>
          <h2>Qty</h2>
          <h3>Price</h3>
        </div>

        {/*  -----------item_first_row---------------- */}
        <div className="item_first_row">
          <h1>Product ID # 6789</h1>
          <div className="first_row">
            <img src={Laptop} />
            <h2>{props.item1}</h2>
            <div className="first_row_quantity">
              <select id="quantity">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
            <div className="first_row_price">
              <h2>{props.price}</h2>
              <h3>{props.pricetotal}</h3>
            </div>
          </div>
          <div className="line">
            <hr />
          </div>
        </div>

        {/*  -----------item_second_row---------------- */}
        <div className="item_second_row">
          <h1>Product ID # 6789</h1>
          <div className="second_row">
            <img src={Laptop} />
            <h2>{props.item2}</h2>
            <div className="second_row_quantity">
              <select id="quantity">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
            <div className="second_row_price">
              <h2>{props.price}</h2>
              <h3>{props.pricetotal}</h3>
            </div>
          </div>
          <div className="line">
            <hr />
          </div>
        </div>

        {/*  -----------item_third_row---------------- */}
        <div className="item_third_row">
          <h1>Product ID # 6789</h1>
          <div className="third_row">
            <img src={Laptop} />
            <h2>{props.item3}</h2>
            <div className="third_row_quantity">
              <select id="quantity">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
            <div className="third_row_price">
              <h2>{props.price}</h2>
              <h3>{props.pricetotal}</h3>
            </div>
          </div>
          <div className="line">
            <hr />
          </div>
        </div>

        {/*  ----------last_row---------------- */}
        <div className="last_row">
          <div className="last_row_title">
            <h1>Total Discount</h1>
            <h2>Discount</h2>
            <h3>Sales Tax (2%)</h3>
            <h4>Total</h4>
          </div>

          <div className=" last_row_price">
            <h1>{props.total_discount}</h1>
            <h2>{props.discount}</h2>
            <h3>{props.sales_tax}</h3>
            <h4>{props.Total}</h4>
          </div>
        </div>

        {/*  ----------Buttons---------------- */}
        <div className="invoicebutn">
          <button className="btn1">Void Invoice</button>
          <button className="btn2">Pay Now</button>
          <button className="btn3">Hold invoice</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
