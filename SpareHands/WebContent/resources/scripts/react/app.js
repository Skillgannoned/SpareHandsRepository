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

					<div className="input-group">
						<input type="search" value={this.state.symbol} onChange={this.searchHandler} className="form-control" placeholder="Enter any search parameter..."/> 
						<span className="input-group-btn">
						</span>
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

var Paginator = React.createClass({

    render: function () {
        var pages = Math.ceil(this.props.total/this.props.pageSize);
        return (
            <div className="container">
                <div className="row padding" style={{height: "40px"}}>
                    <div className="col-xs-4 nopadding">
                        <button type="button" className={"btn btn-default" + (this.props.page <= 1 ? " hidden" : "")} onClick={this.props.previous}>
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Previous
                        </button>
                    </div>
                    <div className="col-xs-4 text-center">
                        <div className="legend">{this.props.total} jobs • page {this.props.page}/{pages}</div>
                    </div>
                    <div className="col-xs-4 nopadding">
                        <button type="button" className={"btn btn-default pull-right" + (this.props.page >= pages ? " hidden" : "")} onClick={this.props.next}>
                        Next <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

var JobsGrid = React.createClass({
	getInitialState: function() {
    	var data = getJobBySearchKey("");
    	var pagnated = data.slice(0,8);
        return {
        	searchKey:"",
        	pageSize:8,
        	jobs: pagnated,
        	total: data.length,
        	page: 1}
    },
    searchHandler:function(key) {
    	var data = getJobBySearchKey(key);
    	var pagnated = data.slice(0,8);
        this.setState({searchKey: key, jobs: pagnated, total: data.length, page:1})
    },
    nextPage: function() {
        var p = this.state.page + 1;
        this.setState({page: p}, this.pageChange(this.state.searchKey));
    },
    prevPage: function() {
        var p = this.state.page - 1;
        this.setState({page: p}, this.pageChange(this.state.searchKey));
    },
    pageChange: function(key) {
    	var data = getJobBySearchKey(key, this.state.page);
    	var pagnated = data.slice((this.state.page-1)*8,this.state.page*this.state.pageSize);
        this.setState({searchKey: key, jobs: pagnated, total: data.length})
    },
    render: function () {
        return (
        	<div>
	        	<div className="searchBar">
	        		<SearchBar searchHandler={this.searchHandler} />
	        	</div>
	            <div className="container">
	            	<Paginator page={this.state.page} pageSize={this.state.pageSize} total={this.state.total} previous={this.prevPage} next={this.nextPage}/>
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