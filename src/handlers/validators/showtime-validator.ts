import Joi from "joi";
import { Salle } from "../../database/entities/salle";
import { Movie } from "../../database/entities/movie";


export const createShowtimeValidation = Joi.object<CreateShowtimeValidationRequest>({
    salle: Joi.number().required(),
    movie: Joi.number().required(),
    start_datetime: Joi.date().required().custom((value, helpers) => {
        const date = new Date(value);
        const dayOfWeek = date.getUTCDay(); 
        if (dayOfWeek < 1 || dayOfWeek > 5) {
            return helpers.error('Showtime must be scheduled from Monday to Friday.');
        }
        const time = date.getUTCHours();
        if(time < 9 || time > 19) {
            return helpers.error('Showtime must be scheduled from 9AM to 8PM.');
        }
        return value;
    }),    
    special_notes : Joi.string().required()
}).options({ abortEarly: false });

export interface CreateShowtimeValidationRequest {
    salle: Salle
    movie: Movie
    start_datetime: Date,
    end_datetime: Date,
    special_notes: string,
}

export const listShowtimeValidation = Joi.object<ListShowtimeRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    salle: Joi.number().optional(),
    movie: Joi.number().optional(),
    start_datetime: Joi.date().optional(),
    end_datetime: Joi.date().optional(),
    special_notes: Joi.string().optional()
})

export interface ListShowtimeRequest {
    limit?: number
    page?: number
    salle?: number;
    movie?: number;
    start_datetime?: Date;  
    end_datetime?: Date; 
    special_notes?: string;
}


export const showtimeIdValidation = Joi.object<ShowtimeIdRequest>({
    id: Joi.number().required(),
})

export interface ShowtimeIdRequest {
    id: number
}


export const updateShowtimeValidation = Joi.object<UpdateShowtimeRequest>({
    id: Joi.number().required(),
    start_datetime: Joi.date().optional().custom((value, helpers) => {
        console.log("value",value)
        const date = new Date(value);
        const dayOfWeek = date.getUTCDay(); 
        if (dayOfWeek < 1 || dayOfWeek > 5) {
            return helpers.error('Showtime must be scheduled from Monday to Friday.');
        }
        const time = date.getUTCHours();
        if(time < 9 || time > 20) {
            return helpers.error('Showtime must be scheduled from 9AM to 8PM.');
        }
        
        return value;
    }),
    end_datetime: Joi.date().optional(),   
    special_notes: Joi.string().optional(),
    salle: Joi.number().optional(),
    movie: Joi.number().optional(),
})

export interface UpdateShowtimeRequest {
    id: number
    start_datetime?:Date
    end_datetime?: Date
    special_notes?: string
    salle: Salle
    movie: Movie
}


export const salleIdValidation = Joi.object<SalleIdRequest>({
    id: Joi.number().required(),
})

export interface SalleIdRequest {
    id: number
}


export const showtimePlanningValidation = Joi.object<ShowtimePlanningRequest>({
    startDate : Joi.date().optional(),
    endDate: Joi.date().optional(),
})

export interface ShowtimePlanningRequest {
    startDate?: Date,
    endDate?: Date,
}