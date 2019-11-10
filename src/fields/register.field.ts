import { ObjectWithProps, FieldSerializer, FieldDecorator } from './interfaces.field';
import { BinaryWriter, BinaryReader } from 'stream-binary';

export const propertySerializerName = '__serializer__';

export function register<T>(
    target: ObjectWithProps,
    property: string | symbol,
    serializer: FieldSerializer<T>,
) {
    if (!target[propertySerializerName]) {
        Object.defineProperty(target, propertySerializerName, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {},
        });
    }

    target[propertySerializerName][property.toString()] = serializer;
}

export function buildField<T>(serializer: FieldSerializer<T>) {
    const Field: FieldDecorator = () => {
        const internalRegister = (target: ObjectWithProps, property: string | symbol) => {
            register<T>(
                target,
                property,
                serializer,
            );
        };

        internalRegister.__serializer__ = serializer;

        return internalRegister;
    };
    return Field;
}
