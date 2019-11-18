import { withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const HELLO = gql`
  query Hello {
    hello
  }
`;

const IndexPage = props => {
  const {data, loading} = useQuery(HELLO)
  // console.log(data)
  return (
    <>
    {loading ? <p>loading...</p> : <p>{data.hello}</p>}
    </>
  
  )
};
export default withApollo(IndexPage);
