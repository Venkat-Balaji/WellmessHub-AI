import { Request, Response } from "express";
import Client from "../models/Client";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// 📌 Create a new client
export const createClient = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, phone, notes } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.create({
      name,
      email,
      phone,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

// 📋 Get all clients for logged-in user
export const getClients = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const clients = await Client.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

// 📝 Update client
export const updateClient = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, notes } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (client.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.notes = notes || client.notes;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

// ❌ Delete client
export const deleteClient = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (client.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await client.deleteOne();
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};
