

public class Food {

	private String food_id;
	private String foodname;
	private int unit;
	private int price;

	public Food(String food_id, String foodname, int price) {
		this.food_id = food_id;
		this.foodname = foodname;
		this.price = price;
	}

	public String getFoodname() {
		return foodname;
	}

	public void setFoodname(String foodname) {
		this.foodname = foodname;
	}

	public int getUnit() {
		return unit;
	}

	public void setUnit(int unit) {
		this.unit = unit;
	}

	public Food(String foodname, int unit) {
		this.foodname = foodname;
		this.unit = unit;
	}

	public String getId() {
		return food_id;
	}

	public void setId(String food_id) {
		this.food_id = food_id;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return food_id +"   "+ price;
	}
	

}
