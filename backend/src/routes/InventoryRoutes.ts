import express, { Request, Response, Router } from "express";
import Inventory from "../sequalize/models/Inventory.ts";
import { Op } from "sequelize";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { location } = req.query;

  console.log("სორტტტტ", location);
  try {
    let inventories: Inventory[];
    if (location == "all") {
      inventories = await Inventory.findAll();
    } else {
      const decodedLocation = decodeURIComponent(location as string);
      inventories = await Inventory.findAll({
        where: { location: decodedLocation },
      });
      console.log(inventories);
    }
    res.json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      location,
      price,
    }: { name: string; location: string; price: number } = req.body;
    const inventory: Inventory = await Inventory.create({
      name,
      location,
      price,
    });
    res.status(201).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:inventoryID", async (req: Request, res: Response) => {
  const { inventoryID } = req.params;
  try {
    const item: Inventory | null = await Inventory.findByPk(inventoryID);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    await item.destroy();
    res.status(204).json({ success: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
