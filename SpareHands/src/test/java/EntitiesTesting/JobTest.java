package EntitiesTesting;
import static org.junit.Assert.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import ie.sparehands.entities.*;

public class JobTest {
	private final User OWNER = new User();
	private final String TITLE = "Cut Grass";
	private final String DESCRIPTION = "1/2 Acre to be cut.";
	private final String REWARD = "$20";
	private final String LOCATION = "Athlone";
	private final Date DATE = new Date();
	private Job job;

	@Before
	public void setUp() throws Exception {
		job = new Job();
	}

	@Test
	public void testParameteredConstructor() {
		job = new Job(OWNER,TITLE,DESCRIPTION,REWARD,LOCATION,DATE);
		job.getId();
		assertEquals(OWNER, job.getOwner());
		assertEquals(TITLE, job.getTitle());
		assertEquals(DESCRIPTION, job.getDescription());
		assertEquals(REWARD, job.getReward());
		assertEquals(LOCATION, job.getLocation());
		try {
			DateFormat parser = new SimpleDateFormat("dd-MM-yyyy");
			String fDate = parser.format(DATE);
			assertEquals(fDate, job.getDate());
		} catch (ParseException e) {
		}
	}
}
