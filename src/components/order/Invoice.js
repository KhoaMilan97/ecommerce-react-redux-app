import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function Invoice({ order }) {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>MERN Ecommerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table data={order.products}>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell getContent={(r) => r.product.title} />
            <DataTableCell getContent={(r) => `$${r.product.price}`} />
            <DataTableCell getContent={(r) => r.count} />
            <DataTableCell getContent={(r) => r.product.brand} />
            <DataTableCell getContent={(r) => r.product.color} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>
            Date: {"               "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {"\n"}
          <Text>
            Order Id: {"         "}
            {order.paymentIntent.id}
          </Text>
          {"\n"}
          <Text>
            Order Status: {"  "}
            {order.orderStatus}
          </Text>
          {"\n"}
          <Text>
            Total Paid: {"       "}
            {order.paymentIntent.amount}
          </Text>
        </Text>

        <Text style={styles.footer}> ~ Thank for shopping with us ~ </Text>
      </Page>
    </Document>
  );
}

export default Invoice;
