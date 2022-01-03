import { FC } from 'react';
import { Overlay } from '../utils/styles';

export const Spinner: FC = ({ children }) => <Overlay>{children}</Overlay>;
