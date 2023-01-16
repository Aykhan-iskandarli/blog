import Cookies from "js-cookie";
import { AppProps } from "next/app";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  return (
        <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Category</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Tag</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">right</div>
                    </div>
                </div>
  );
};

export default Admin;
