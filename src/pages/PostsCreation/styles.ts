import { FadersHorizontal } from 'phosphor-react';
import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const ContainerForm = styled(Container)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    textarea{
        resize: none;
    }
`
export const CardContainer = styled(Card)`
    padding: 30px;
    h1{
        font-weight: bold;
    }


`
export const EditConfigIcon = styled(FadersHorizontal)`
    background-color: #706B57;
    color: white;
    padding:3px;
    cursor: pointer;
    border-radius: 3px;
    &:hover{
        transition: background-color 0.2s;
        background-color: #BDB3A0;
    }
`