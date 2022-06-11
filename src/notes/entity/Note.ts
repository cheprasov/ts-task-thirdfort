import EntityInterface from '../../common/repository/EntityInterface';
import { Nullable } from '../../types/Nullable';

export default class Note implements EntityInterface<number> {

    protected _id: Nullable<number>;
    protected _title: string;
    protected _text: string;

    constructor(
        id: Nullable<number>,
        title: string,
        text: string
    ) {
        this._id = id;
        this._title = title;
        this._text = text;
    }

    setId(id: number): void {
        this._id = id;
    };

    getId(): Nullable<number> {
        return this._id;
    };

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    getText(): string {
        return this._text;
    }

    setText(text: string): void {
        this._text = text;
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            text: this._text,
        };
    }

}