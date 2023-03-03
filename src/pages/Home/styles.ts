import { PlusCircle } from 'phosphor-react';
import styled from 'styled-components';
import { Container } from "react-bootstrap";

export const CardsContainer = styled(Container)`
    margin-top: 2rem;
`
export const AddPostButton = styled(PlusCircle)`
    background-color: #2F58CD;
    color: white;
    border-radius: 15px;
    padding: 0.2rem;
    transition: 0.8s;
    margin-bottom: 12px;
    &:hover{
        cursor: pointer;
        border-radius: 10px;
        transform: scale(1.1);
    }
`


export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`



export const BodyContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    svg{
        background-color: #DF2E38;
        padding:0.2rem;
        color: white;
        border-radius: 5px; 
        cursor: pointer;
        &:hover{
            background-color: #CC1601;
        }
        &:focus-within{
            outline: none;
        }
    }

`