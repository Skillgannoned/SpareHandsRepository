var SearchBar = React.createClass({
	getInitialState: function() {
	    return {searchKey: ""};
	},
	searchHandler: function(event) {
	    var searchKey = event.target.value;
	    this.setState({searchKey: searchKey});
	    this.props.searchHandler(searchKey);
	},
	render: function () {	
		return (
			<div className="panel panel-info">
				<div className="col-lg-6">
					<div className="input-group">
						<input type="search" value={this.state.symbol} onChange={this.searchHandler} className="form-control"/> 
						<span className="input-group-btn">
						</span>
					</div>
				</div>
			</div>
	    );
	}
});

var JobListItem = React.createClass({
    render: function () {
        return (
	        	<div className="panel panel-primary">
					<div className="panel-heading">{this.props.job.title}</div>
					<div className="panel-body">{this.props.job.description}</div>
					<div className="panel-footer">{this.props.job.location} - {this.props.job.reward}</div>
				</div>
        );
    }
});

var JobList = React.createClass({
    render: function () {
        var items = this.props.jobs.map(function (job) {
            return (
                <JobListItem key={job.id} job={job} />
            );
        });
        return (
            <div className="row">
                {items}
            </div>
        );
    }
});

var JobsGrid = React.createClass({
	getInitialState: function() {
        return {jobs: getAllJobs()}
    },
    searchHandler:function(key) {
        this.setState({searchKey: key, jobs: getJobBySearchKey(key)})
    },
    render: function () {
        return (
        	<div>
	        	<div className="sidebar">
	        		<SearchBar searchHandler={this.searchHandler} />
	        	</div>
	            <div className="container">
	                <JobList jobs={this.state.jobs}/>
	            </div>
            </div>
        );
    }
});

React.render(
    <JobsGrid />,
    document.getElementById("jobs-section")
);