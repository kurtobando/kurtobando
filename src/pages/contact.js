import React, { Fragment } from "react"
import TemplateDefault from "../component/template.default"
import SocialMediaList from "../component/social.media.list"
import AccentLine from "../component/accent.line";

const Contact = () => {
	return (
		<Fragment>
			<TemplateDefault>
				<div className="d-flex flex-column justify-content-center" style={{ minHeight : "90vh" }}>
					<div className="text-center">
						<h1>Want to work together ? </h1>
						<AccentLine/>
						<p>I work best with people who are passionate about what they are working on. If you are excited about something you are making. I want to work with you.</p>
						<SocialMediaList />
						<form className="d-flex flex-column" >
							<div className="form-group">
								<input className="form-control" type="text" placeholder="name" />
							</div>
							<div className="form-group">
								<input className="form-control" type="email" placeholder="email address" />
							</div>
							<div className="form-group">
								<textarea className="form-control" rows="10"  placeholder="message" />
							</div>
							<input className="btn btn-primary btn-block" type="submit" value="send message" />
						</form>
					</div>
				</div>
			</TemplateDefault>
		</Fragment>
	)
}

export default Contact