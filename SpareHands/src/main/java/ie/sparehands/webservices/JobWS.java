package ie.sparehands.webservices;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ie.sparehands.daos.JobDAO;
import ie.sparehands.entities.Job;
import ie.sparehands.entities.User;

@Path("/job")
@Stateless
@LocalBean
public class JobWS {

	 @EJB
	    private JobDAO jobDao;

	    @GET 
	    @Path("/allJobs")
	    @Produces({ MediaType.APPLICATION_JSON})
	    public Response findAll() {
	    	final List<Job> jobs = jobDao.getAllJobs();
	        return Response.status(200).entity(jobs).build();
	    }	   
	  
	    @GET
		@Path("/allJobs/{id}")
		@Produces({ MediaType.APPLICATION_JSON })
		public Response findJobById(@PathParam("id") int id) {
			final Job job = jobDao.getJob(id);
			return Response.status(200).entity(job).build();
		}
	    
	    @GET
		@Path("/allJobs/owner/{id}")
		@Produces({ MediaType.APPLICATION_JSON })
		public Response findJobsByOwnerId(@PathParam("id") int id) {
			final List<Job> job = jobDao.getJobsByOwnerId(id);
			return Response.status(200).entity(job).build();
		}
	    
	    @GET
		@Path("/jobsByKey/{searchKey}")
		@Produces({ MediaType.APPLICATION_JSON })
		public Response findJobBySearchKey(@PathParam("searchKey") String searchKey) {
	    	final List<Job> jobs = jobDao.getJobBySearchKey(searchKey);
			return Response.status(200).entity(jobs).build();
		}
	    
	    @POST
	    @Path("/addJob")
	    @Produces({ MediaType.APPLICATION_JSON })
	    public Response saveJob(final Job job) {
	    	jobDao.save(job);
	        return Response.status(201).entity(job).build();
	    }
	    
	    @DELETE
	    @Path("/deleteJob/{id}")
	    public Response deleteJob(@PathParam("id") int id){
	    	jobDao.delete(id);
	    	return Response.status(204).build();
	    }  
}
