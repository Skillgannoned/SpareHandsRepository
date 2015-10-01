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

import ie.sparehands.daos.AdvertDAO;
import ie.sparehands.entities.Advert;
import ie.sparehands.entities.User;

@Path("/advert")
@Stateless
@LocalBean
public class AdvertWS {

	 @EJB
	    private AdvertDAO advertDao;

	    @GET 
	    @Path("/allAdverts")
	    @Produces({ MediaType.APPLICATION_JSON})
	    public Response findAll() {
	    	System.out.println("Get all adverts");
	    	final List<Advert> adverts = advertDao.getAllAdverts();
	        return Response.status(200).entity(adverts).build();
	    }	   
	  
	    @GET
		@Path("/allAdverts/{id}")
		@Produces({ MediaType.APPLICATION_JSON })
		public Response findAdvertById(@PathParam("id") int id) {
			final Advert advert = advertDao.getAdvert(id);
			return Response.status(200).entity(advert).build();
		}
	    
	    @POST
	    @Path("/addAdvert")
	    @Produces({ MediaType.APPLICATION_JSON })
	    public Response saveAdvert(final Advert advert) {
	    	advertDao.save(advert);
	        return Response.status(201).entity(advert).build();
	    }
	    
	    @PUT @Path("/editAdvert/{id}")
		@Consumes({ MediaType.APPLICATION_JSON })
		public Response updateAdvert(Advert advert) {
	    	advertDao.update(advert);
			return Response.status(200).entity(advert).build();
		}
	    
	    @DELETE
	    @Path("/deleteAdvert/{id}")
	    public Response deleteAdvert(@PathParam("id") int id){
	    	System.out.println("advert " + id + " deleted");
	    	advertDao.delete(id);
	    	return Response.status(204).build();
	    }
	    
}
