import React from "react";
import { toast } from "react-toastify";
import * as userService from "../../services/userService";

class FriendsForm extends React.Component {
	state = {
		formData: [
			{
				title: "",
				bio: "",
				summary: "",
				headline: "",
				slug: "",
				statusId: "Active",
				skills: "",
				img: "",
			},
		],
	};

	onFormFieldChanged = (e) => {
		let currentTarget = e.currentTarget;
		let newValue = currentTarget.value;
		let inputName = currentTarget.name;

		this.setState(() => {
			let formData = { ...this.state.formData };

			formData[inputName] = newValue;
			return { formData };
		});
	};

	onSubmitClicked = (e) => {
		//make axios call
		e.preventDefault();
		console.log("Submit Sent");
		userService
			.formFriends(this.state.formData)
			.then(this.getSuccess)
			.catch(this.getError);
	};

	getSuccess = (myFriends) => {
		console.log(myFriends);
		toast("Created");
		this.setState((prestate) => {
			return { mappedFriends: myFriends.map(this.mapFriends) };
		});
	};

	getError = (response) => {
		toast("Not Created");
	};

	mapFriends = (oneFriend) => {
		return (
			<React.Fragment key={`Friends-${oneFriend.id}`}>
				<div className="card col-md-3">
					<img src={oneFriend.img} class="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{oneFriend.title}</h5>
						<p className="card-text">{oneFriend.bio}</p>
						<p className="card-text">{oneFriend.summary}</p>
						<p className="card-text">{oneFriend.headline}</p>
						<p className="card-text">{oneFriend.slug}</p>
						<p className="card-text">{oneFriend.status}</p>
						<p className="card-text">{oneFriend.skills}</p>
						<p className="card-text">{oneFriend.img}</p>
						<a href="null" className="btn btn-primary">
							Edit
						</a>
						<a href="null" className="btn btn-primary">
							Delete
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	};

	render() {
		return (
			<form>
				<div className="mb-1 p-2">
					<label htmlFor="inputTitle" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						id="inputTitle1"
						placeholder="John Doe"
						name="title"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>

				<div className="mb-1">
					<label htmlFor="bio" className="form-label">
						Bio
					</label>
					<input
						type="text"
						className="form-control"
						id="InputBio"
						placeholder="Insert Bio here!"
						name="bio"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>

				<div className="mb-1">
					<label htmlFor="inputSummary1" className="form-label">
						Summary
					</label>
					<input
						type="text"
						className="form-control"
						id="inputSummary1"
						placeholder="Tell us about yourself"
						name="summary"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>

				<div className="mb-1">
					<label htmlFor="inputHeadline" className="form-label">
						Headline
					</label>
					<input
						type="text"
						className="form-control"
						id="inputHeadline1"
						placeholder="Profile Headline!"
						name="headline"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>

				<div className="mb-1">
					<label htmlFor="inputSlug1" className="form-label">
						Slug
					</label>
					<input
						type="text"
						className="form-control"
						id="inputSlug1"
						placeholder="Profile URL"
						name="slug"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>
				<div className="mb-1">
					<label htmlFor="inputStatus1" className="form-label">
						Status
					</label>
					<input
						type="text"
						className="form-control"
						id="inputStatus1"
						placeholder="Active"
						name="status"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>
				<div className="mb-1">
					<label htmlFor="inputSkills1" className="form-label">
						Skills
					</label>
					<input
						type="text"
						className="form-control"
						id="inputSkills1"
						placeholder="What skills do you have?"
						name="skills"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>

				<div className="mb-1">
					<label htmlFor="inputImg1" className="form-label">
						Primary Image
					</label>
					<input
						type="url"
						className="form-control"
						id="inputImg1"
						placeholder="Profile image here!"
						name="img"
						onChange={this.onFormFieldChanged}
						value={this.state.formData.name}
					/>
				</div>
				<div className="p-2">
					<button
						onClick={this.onSubmitClicked}
						type="submit"
						className="btn btn-primary"
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default FriendsForm;
