import { Request, Response } from 'express';
import { CaseModel } from '../../../data/models/case.model';

export class CaseController {
    public getCases = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json([])
        }
    }

    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const _case = await CaseModel.findById(id);
            return res.json(_case);
        } catch (error) {
            return res.json([]);
        }
    }

    public createNewCase = async (req: Request, res: Response) => {
        try {
            const { fullName, lat, lng, genre, age } = req.body;
            const newCase = await CaseModel.create({
                fullName,
                lat,
                lng,
                genre,
                age
            });

            res.json(newCase);
        } catch (error) {
            return res.json(error)
        }
    }

    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { fullName, age, genre, lat, lng} = req.body;
      
            await CaseModel.findByIdAndUpdate(id, {
                fullName,
                lat,
                lng,
                genre,
                age
            });
      
            const updateIncident = await CaseModel.findById(id);
      
            return res.json(updateIncident);
        } catch (error) {
            return res.json({ message: "Ocurrio un error."})
        }   }

    public deleteCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await CaseModel.findByIdAndDelete(id);
            res.json({ message: "Todo bien" })
        } catch (error) {
            return res.json({ message: "Ocurrio un error."}) 
        }
    }
}