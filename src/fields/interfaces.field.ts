import { BinaryReader, BinaryWriter } from 'stream-binary';

export interface IPropsType {
    [prop: string]: FieldSerializer;
}
export interface ObjectWithProps {
    [prop: string]: any;
    __serializer__?: IPropsType;
}

export interface FieldSerializer<T = any> {
    serialize: (value: T, br: BinaryWriter) => void;
    deserialize: (sr: BinaryReader) => T;
}

export interface ObjectWithSerializer<T = any> {
    __serializer__?: FieldSerializer<T>;
}

export type FieldRegistered = (target: ObjectWithProps, property: string | symbol) => void;

export type FieldDecorator = (...args: any[]) => FieldRegistered;
