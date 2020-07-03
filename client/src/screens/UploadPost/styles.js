import styled from "styled-components";

export const Card = styled.div`
  position: relative;

  margin: 5rem auto;
  padding: 1.5rem;
  background: rgba(var(--d87, 255, 255, 255), 1);
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid
    ${(props) =>
      props.error ? "transparent" : "rgba(var(--b6a, 219, 219, 219), 1)"};
  margin: 2rem auto;
  padding: 5px;
  display: block;
  /* width: 30%; */
  transition: 0.2s all ease-in;
  background: rgba(var(--b3f, 250, 250, 250), 1);

  &:focus {
    border-bottom: 1px solid ${(props) => (props.error ? "red" : "blue")};
  }

  &::placeholder {
  }
`;

export const Form = styled.form`
  width: 30%;
  margin: 0 auto;
  input,
  button {
    width: 100%;
  }
`;

export const Image = styled.div`
  /* width: 20%; */
  height: 200px;
  margin: 0 auto;

  background: url(${(props) =>
    props.src ||
    "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
