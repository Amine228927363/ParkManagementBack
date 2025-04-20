import { Request, Response, NextFunction } from 'express';
import { PrismaClient, RequestStatus } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Créer une nouvelle demande d'arrivée
export const createArrivalRequest = async (req: Request, res: Response) => {
  try {
    const {
      sosUserId,
      supplierName,
      contactPerson,
      phone,
      vehiclePlate,
      company,
      requestedTime,
      parkingSpot
    } = req.body;

    if (
      !sosUserId || !supplierName || !contactPerson ||
      !phone || !vehiclePlate || !company || !requestedTime || !parkingSpot
    ) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const request = await prisma.arrivalRequest.create({
      data: {
        sosUserId,
        supplierName,
        contactPerson,
        phone,
        vehiclePlate,
        company,
        requestedTime: new Date(requestedTime),
        parkingSpot,
      },
    });

    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Erreur création de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ✅ Récupérer toutes les demandes
export const getAllArrivalRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.arrivalRequest.findMany({
      include: {
        sosUser: true,
        decisionBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ✅ Récupérer une demande par ID
export const getArrivalRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await prisma.arrivalRequest.findUnique({
      where: { id: Number(id) },
      include: {
        sosUser: true,
        decisionBy: true,
      },
    });

    if (!request) return res.status(404).json({ message: 'Demande introuvable' });

    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Modifier le statut (approve / reject)
export const updateRequestStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, decisionById, rejectionReason } = req.body;

  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  try {
    const updated = await prisma.arrivalRequest.update({
      where: { id: Number(id) },
      data: {
        status: status as RequestStatus,
        decisionById,
        updatedAt: new Date(),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Supprimer une demande
export const deleteArrivalRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.arrivalRequest.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: 'Demande supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
