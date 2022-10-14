import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class FoodItem extends JPanel {
	String idFood, name;
	int price, qty = 0, y;
	String foodString = null;

	static int temp = 0;

	public static ArrayList<FoodItem> foodList = new ArrayList<>();

//	static Button plusButton = new Button("+");
//	static Button minusButton = new Button("-");

	JLabel plusButton = new JLabel(new ImageIcon(
			new ImageIcon("Image/plus.png").getImage().getScaledInstance(30, 30, java.awt.Image.SCALE_SMOOTH)));
	JLabel minusButton = new JLabel(new ImageIcon(
			new ImageIcon("Image/minus.png").getImage().getScaledInstance(30, 30, java.awt.Image.SCALE_SMOOTH)));

	String path = null;
	ImageIcon icon;
	Image scale;

	public FoodItem(String n, int p, int qt) {
		name = n;
		price = p;
		qty = qt;
	}

	public FoodItem(String id, String n, int p, int y, String path) {
		this.y = y;
		idFood = id;
		name = n;
		price = p;
		this.path = path;

		plusButton.setBounds(900, 50, 30, 30);
		plusButton.addMouseListener(new MouseListener() {
			@Override
			public void mouseReleased(MouseEvent e) {
			}

			public void mousePressed(MouseEvent e) {
			}

			public void mouseExited(MouseEvent e) {
				plusButton.setBounds(900, 50, 30, 30);
				plusButton.setIcon(new ImageIcon(new ImageIcon("Image/plus.png").getImage().getScaledInstance(30, 30,
						java.awt.Image.SCALE_SMOOTH)));
			}

			public void mouseEntered(MouseEvent e) {
				plusButton.setBounds(895, 45, 40, 40);
				plusButton.setIcon(new ImageIcon(new ImageIcon("Image/plus.png").getImage().getScaledInstance(40, 40,
						java.awt.Image.SCALE_SMOOTH)));
			}

			public void mouseClicked(MouseEvent e) {
				qty++;
				for (int i = 0; i < foodList.size(); i++) {
					FoodItem t = foodList.get(i);
					if (t.getName().equals(name))
						foodList.remove(t);
				}
				foodList.add(new FoodItem(name, price, qty));
				repaint();
			}
		});

		minusButton.setBounds(800, 50, 30, 30);
		minusButton.addMouseListener(new MouseListener() {

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				minusButton.setBounds(800, 50, 30, 30);
				minusButton.setIcon(new ImageIcon(new ImageIcon("Image/minus.png").getImage().getScaledInstance(30, 30,
						java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				minusButton.setBounds(795, 45, 40, 40);
				minusButton.setIcon(new ImageIcon(new ImageIcon("Image/minus.png").getImage().getScaledInstance(40, 40,
						java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				if (qty == 0)
					return;
				else {
					qty--;
					for (int i = 0; i < foodList.size(); i++) {
						FoodItem t = foodList.get(i);
						if (t.getName().equals(name))
							foodList.remove(t);
					}
					if (qty != 0)
						foodList.add(new FoodItem(name, price, qty));
					repaint();
				}
			}
		});

		System.out.println("CHECK1 BOOLEAN: " + this.name + " " + Menu.bl);
		if (Menu.bl == true) {
			add(plusButton);
			add(minusButton);
		}
		System.out.println("CHECK2 BOOLEAN: " + this.name + " " + Menu.bl);

		setLayout(null);
		setBounds(20, y, Window.getW() * 3 / 4 - 50, 130);
		setBackground(new Color(255, 250, 205));
	}

	public void setY(int valueY) {
		setBounds(20, valueY, Window.getW() * 3 / 4 - 50, 130);
	}

	public void paintComponent(Graphics g) {
		super.paintComponent(g);

		if (path != null)
			g.drawImage(setIcon(path), 50, 10, null);

		g.setColor(new Color(107, 142, 35));
		g.drawRoundRect(25, 5, Window.getW() * 3 / 4 - 100, 123, 70, 70);

//		g.setColor(Color.LIGHT_GRAY);
		g.setFont(new Font("Stabillo", Font.TRUETYPE_FONT, 60));
		g.drawString(this.getName(), 150, 70);

		g.setFont(new Font("Colonna MT", Font.BOLD, 50));
		g.drawString("" + this.getPrice(), 500, 110);

		g.setFont(new Font("Arial", Font.BOLD, 30));
		if (Menu.bl == true) {
			int i = 0;
			if (i == 0) {
				g.drawString("" + qty, 860, 75);
				add(plusButton);
				add(minusButton);
				i++;
			}
		} else {
			int i = 0;
			if (i == 0) {
				remove(plusButton);
				remove(minusButton);
				i++;
			}
		}
//		g.drawImage(image,0,0,null);
	}

	public String toString() {
		return "ID:" + this.idFood + " Name:" + this.getName() + " Price:" + this.getPrice();
	}

	public String getIdFood() {
		return idFood;
	}

	public void setIdFood(String idFood) {
		this.idFood = idFood;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
//	public void setImage (ImageIcon i) {
//		this.image = i;
//	}

	public Image setIcon(String path) {
		icon = new ImageIcon(path);
		scale = icon.getImage().getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH);
		icon = new ImageIcon(scale);

		return icon.getImage();
	}

	public int getQty() {
		return qty;
	}
}
