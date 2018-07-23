import { createElement, Component } from 'react';

export default function(){
    return <div>asdf</div>
}

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider, Query } from 'react-apollo';
// import gql from 'graphql-tag';

// const client = new ApolloClient({
//     uri: '/gql',
//     fetchOptions:{
//         fetch:{} as any
//     }
// });

// class ApolloPage extends Component<any, any> {
// 	render() {
// 		return (
// 			<div>
// 				<h1>Apollo</h1>
// 				<div>
// 					<Query
// 						query={gql`
// 							{
// 								author(id: 1) {
// 									id
// 									name
// 								}
// 							}
// 						`}
// 					>
// 						{({ loading, error, data }) => {
// 							console.log(loading, error, data);

// 							if (loading) return <span>loading</span>;
// 							if (error) return <span>error</span>;

// 							return <h3>{JSON.stringify(data)}</h3>;
// 						}}
// 					</Query>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default function() {
// 	return (
// 		<ApolloProvider client={client}>
// 			<ApolloPage />
// 		</ApolloProvider>
// 	);
// }
