import React from 'react';
import { Card, CardDeck, Container, Row, Col } from 'react-bootstrap';
import { Input } from 'mdb-ui-kit';
import * as FriendService from '../services/FriendService';
import { toast } from 'react-toastify';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class Friends extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: {
				current: 1,
				pageSize: 10,
				totalCount: 0
			},
			friends: []
		};
	}

	componentDidMount() {
		let size = this.state.page.pageSize;

		FriendService.getFriends(0, size).then(this.onFriendsSuccess).catch(this.onFriendsError);
	}

	onChange = (page) => {
		console.log(page);
		this.setState({
			...this.state.page,
			current: page
			// currPage: page
		});
		FriendService.getFriends(page - 1, this.state.pageSize)
			.then(this.onFriendsSuccess)
			.catch(this.onFriendsError);
	};

	makeFriend = () => {
		FriendService.makeFriend().then(this.onMakeFSuccess).catch(this.onMakeFError);
	};

	deleteFriend = (e) => {
		let currentTarget = e.currentTarget.parentNode.parentNode;
		let id = currentTarget.id;
		console.log(id);

		FriendService.deleteFriend(id).then(this.onDeleteSuccess).catch(this.onDeleteError);
	};

	deleteCard = (id) => {
		const friends = this.state.friendData.filter((friend) => friend.id !== id);
		this.setState({ friends });
		console.log('card deleted..');
		this.componentDidMount();
	};

	onFriendsSuccess = (response) => {
		this.setState((prevState) => {
			return {
				friends: response.data.item.pagedItems,
				page: { ...prevState.page, totalCount: response.data.item.totalCount }
			};
		});
		console.log('state is...', this.state.friends);
	};

	onFriendsError = (errResponse) => {
		console.log(errResponse);
	};

	onMakeFSuccess = (response) => {
		console.log(response.data);
	};

	onMakeFError = (errResponse) => {
		console.log(errResponse);
	};

	onDeleteSuccess = (response) => {
		console.log(response, 'successfully removed from database..');
		this.deleteCard(response);
	};

	onDeleteError = (errResponse) => {
		console.log(errResponse);
	};

	render() {
		//  const { page, size, currPage } = this.state
		return (
			<Container>
				{/* <Row> */}
				{/* <CardDeck
						className="row mx-5 mt-3 row-cols-1 row-cols-md-2 row-cols-lg-4"
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							alignContent: 'flex-start',
							margin: 10
						}}
					> */}
				{/* //{' '}
				<Card id={friend.id}>
					// <Card.Img variant="top" src={friend.primaryImage.imageUrl} />
					//{' '}
					<Card.Body>
						// <Card.Title>{friend.title}</Card.Title>
						// <Card.Text>{friend.bio}</Card.Text>
						//{' '}
					</Card.Body>
					//{' '}
					<Card.Footer>
						// <button>Edit</button>
						// <button>Delete</button>
						//{' '}
					</Card.Footer>
					//{' '}
				</Card> */}

				<div className="row row-cols-1 row-cols-md-5 g-4">
					{this.state.friends.map((friend) => (
						<div className="col">
							<div
								className="card"
								id={friend.id}
								style={{
									width: '100%',
									height: '93%',
									marginTop: '30px',

									marginRight: '10px'
								}}
							>
								<img src={friend.primaryImage.imageUrl} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{friend.title}</h5>
									<p className="card-text">{friend.bio}</p>
								</div>
								<div
									className="card-footer"
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<button className="btn btn-warning">Edit</button>
									<button type="Button" className="btn btn-danger" onClick={this.deleteFriend}>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<Pagination
					style={{ marginTop: '50px', textAlign: 'center' }}
					pageSize={this.state.page.pageSize}
					total={this.state.page.totalCount}
					currrent={this.state.page.current}
					onChange={this.onChange}
				/>

				{/* </CardDeck> */}
				{/* </Row> */}
			</Container>
		);
	}
}

export default Friends;
