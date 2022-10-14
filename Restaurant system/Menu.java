
import java.awt.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import java.util.ArrayList;
import java.util.Date;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.SwingConstants;



public class Menu extends JPanel {

	JPanel namePanel = new JPanel();
	JLabel name = new JLabel("LQD");
	public static boolean bl;

	public static int total = 0;
	public static int orderMore = 0;
	static ArrayList<FoodItem> foodList = FoodItem.foodList;
	static ArrayList<FoodItem> payFoodList = new ArrayList<>();

	public static JLayeredPane menuLayer = new JLayeredPane();
	JLabel btnQuin,bChicken,bBeverage,bPizza;
	static JPanel chickenPanel = new JPanel() ;
	static JPanel beveragePanel=new JPanel();
	static JPanel burgerPanel=new JPanel();
	static JPanel pizzaPanel=new JPanel();

//	Button btnQuin = new Button("Burger");
//	Button bChicken, bBeverage, bPizza, bBack;

	public Menu() {
		setLayout(null);
		setBounds(0, 0, Window.getW(), Window.getH());

		JLabel Cash = new JLabel(new ImageIcon(new ImageIcon("Image/orderButton.png").getImage().getScaledInstance(80,
				80, java.awt.Image.SCALE_SMOOTH)));
		add(namePanel);
		add(menuLayer);
		Cash.setBounds(Window.getW() - 300, 5, 80,80);
		Cash.addMouseListener(new MouseAdapter() {
			public void mouseClicked(MouseEvent e) {
				total = 0;
				if (foodList.size() == 0) {
					JOptionPane.showMessageDialog(null, "Please order");
					return;
				}

				bill.cash = false;

				for (FoodItem t : foodList) {
					total = total + t.getPrice() * t.getQty();
				}
				bill bill = new bill(LoginFrame.user, foodList);
				bill.setVisible(true);
				bill.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
			}
		});

		JLabel bPay = new JLabel(new ImageIcon(new ImageIcon("Image/cashButton.png").getImage().getScaledInstance(80,80, java.awt.Image.SCALE_SMOOTH)));
		if (bl == true) {
			add(Cash);
			add(bPay);
		}
		bPay.setBounds(Window.getW() - 150, Cash.getY(), 80,80);
		bPay.addMouseListener(new MouseAdapter() {
			@Override

			public void mouseClicked(MouseEvent e) {
				total = 0;
//				System.out.println("CASH");
				if (payFoodList.size() == 0) {
					JOptionPane.showMessageDialog(null, "You haven't order anything to pay");
					return;
				}

				bill.cash = true;

				for (FoodItem t : payFoodList) {
					total = total + t.getPrice() * t.getQty();
				}

				bill bill = new bill(LoginFrame.user, payFoodList);
				bill.setVisible(true);
				bill.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
			}

		});

		namePanel();
		try {
			Layer();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

	public void Layer() throws SQLException {
		// LAYER PANE
		Connection c;
		c = Connect();
		addMenuPanel(c, chickenPanel, "'O%'");
		addMenuPanel(c, beveragePanel, "'D%'");
		addMenuPanel(c, burgerPanel, "'B%'");
		addMenuPanel(c, pizzaPanel, "'P%'");

		menuLayer.setBounds(Window.getW() / 4, 100, Window.getW() * 3 / 4, Window.getH());
//		contentPane.add(layerPane);
		menuLayer.setLayout(new CardLayout(0, 0));

	}

	public static void setLayeredMenuPanel(JPanel p) {
		p.setLayout(null);
		p.setBounds(Window.getW() / 4, 100, Window.getW() * 3 / 4, Window.getH());
		p.setBackground(new Color(255, 250, 205));
	}

	public void namePanel() {
		// NAME PANEL
		JPanel namePanel = new JPanel();
		namePanel.setBounds(0, 0, 345, Window.getH());
		namePanel.setLayout(null);
		namePanel.setBackground(new Color(107, 142, 35));
		add(namePanel);

		btnQuin = new JLabel("Burger");
		btnQuin.setLabelFor(btnQuin);
		btnQuin.setHorizontalAlignment(SwingConstants.CENTER);
		btnQuin.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
		btnQuin.setBounds(10, 137, 325, 71);
		btnQuin.addMouseListener(new MouseAdapter() {
			public void mouseExited(MouseEvent e) {
				btnQuin.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				btnQuin.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 60));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					setBackground(btnQuin);
					restart(burgerPanel, "C%");
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				switchPane(burgerPanel);
			}
		});
		namePanel.add(btnQuin);

		bChicken = new JLabel("Other");
		bChicken.setHorizontalAlignment(SwingConstants.CENTER);
		bChicken.setBounds(10, 289, 325, 71);
		bChicken.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
		bChicken.setBackground(new Color(0, 128, 0));
		bChicken.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				bChicken.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bChicken.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 60));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					setBackground(bChicken);
					restart(chickenPanel, "C%");
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				switchPane(chickenPanel);
			}
		});

		bBeverage = new JLabel("Beverage");
		bBeverage.setHorizontalAlignment(SwingConstants.CENTER);
		bBeverage.setBounds(10, 366, 325, 71);
		bBeverage.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
		bBeverage.setBackground(new Color(0, 128, 0));
		bBeverage.addMouseListener(new MouseAdapter() {
		
			@Override
			public void mouseExited(MouseEvent e) {
				bBeverage.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bBeverage.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 60));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					setBackground(bBeverage);
					restart(beveragePanel, "D%");
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				switchPane(beveragePanel);
			}
		});

		bPizza = new JLabel("Pizza");
		bPizza.setHorizontalAlignment(SwingConstants.CENTER);
		bPizza.setBounds(10, 212, 325, 71);
		bPizza.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
		bPizza.setBackground(new Color(0, 128, 0));
		bPizza.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				bPizza.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bPizza.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 60));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					setBackground(bPizza);
					restart(pizzaPanel, "P%");
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				switchPane(pizzaPanel);
			}
		});

		JLabel bBack = new JLabel("Back");
		bBack.setHorizontalAlignment(SwingConstants.CENTER);
		bBack.setBounds(10, 443, 325, 71);
		bBack.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
		bBack.setIcon(new ImageIcon(new ImageIcon("Image/back_shadow.png").getImage().getScaledInstance(50, 50,
				java.awt.Image.SCALE_SMOOTH)));
		bBack.setBackground(new Color(0, 128, 0));
		bBack.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				bBack.setIcon(new ImageIcon(new ImageIcon("Image/back_shadow.png").getImage().getScaledInstance(50, 50,
						java.awt.Image.SCALE_SMOOTH)));
				bBack.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 45));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bBack.setIcon(new ImageIcon(new ImageIcon("Image/back_shadow.png").getImage().getScaledInstance(65, 65,
						java.awt.Image.SCALE_SMOOTH)));
				bBack.setFont(new Font("Bernard MT Condensed", Font.BOLD | Font.ITALIC, 60));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				if(LoginFrame.user.getRole().equals("Manager")) {
					try {
						Window.switchPane(new UpdateMenu());
						return;
					} catch (SQLException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				} else {
					Window.switchPane(new Welcome());
					Window.fr.dispose();
					new Window();
				}
			}
		});

		if (Menu.bl == false)
			namePanel.add(bBack);

		name.setForeground(new Color(255, 255, 255));
		name.setBackground(new Color(0, 204, 204));

		name.setBounds(92, 11, 128, 100);
		name.setFont(new Font("Harlow Solid Italic", Font.ITALIC, 50));

		namePanel.add(name);
		namePanel.add(bPizza);
		namePanel.add(bBeverage);
		namePanel.add(bChicken);
		namePanel.add(btnQuin);

		Image scale = new ImageIcon("Image/logo.png").getImage().getScaledInstance(50, 50, java.awt.Image.SCALE_SMOOTH);
		JLabel label = new JLabel(new ImageIcon(scale));
		label.setBounds(193, 62, 50, 50);
		namePanel.add(label);

		JLabel lblNewLabel = new JLabel(new ImageIcon(new ImageIcon("Image/menu.jpg").getImage()
				.getScaledInstance(Window.getW() - 344, Window.getH(), java.awt.Image.SCALE_SMOOTH)));
		lblNewLabel.setBounds(344, 0, Window.getW() - 344, Window.getH());
		add(lblNewLabel);
	}

	public static Connection Connect() {
		Connection connection = null;
		try {
			Class.forName("org.sqlite.JDBC");
			String url = "jdbc:sqlite:Restaurant.db";
//			String url = "jdbc:sqlserver://LAPTOP-O9PIICC4\\SQLEXPRESS;"
//					+ "databaseName=Restaurant;user=sa;password=sa";
			connection = DriverManager.getConnection(url);
			System.out.println("ConnectJDBC");

		} catch (Exception e) {
//			System.out.println("ERROR :"+e.getMessage()+"/n"+e.getClass()+"/n"+e.getCause());
			e.printStackTrace();
		}
		return connection;
	}

	public static void Update(String str) {
		Connection c = Connect();
		PreparedStatement create;
		try {
			create = c.prepareStatement(str);
			create.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static ArrayList<String> Select(String select, String tableName) throws SQLException {
		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement("SELECT " + select + " FROM " + tableName + ";");
		ResultSet result = stmt.executeQuery();

		ArrayList<String> arr = new ArrayList<String>();

		while (result.next()) {
//			System.out.println(result.getString(select));
			arr.add(result.getString(select));
		}
		return arr;
	}

	public static void addMenuPanel(Connection c, JPanel panel, String rule) {
//		panel = new JPanel();
		JScrollBar scroll = new JScrollBar();
		setLayeredMenuPanel(panel);
		PreparedStatement stmt;
		try {
			stmt = c.prepareStatement("SELECT * FROM Menu WHERE idFood LIKE" + rule);
			ResultSet result = stmt.executeQuery();
			int y = 0, sl = 0;
			while (result.next()) {
				FoodItem tFood = new FoodItem(result.getString("idFood"), result.getString("name"),
						result.getInt("price"), y, result.getString("imagePath"));
				panel.add(tFood);
				y += 130;
				sl++;
				if (sl >= 5) {
					scroll.setBounds(1000, 0, 20, 605);
					scroll.setMaximum(100 + (sl - 5) * 130-40);
				}
				scroll.addAdjustmentListener(new AdjustmentListener() {
					int y = tFood.getY();

					@Override
					public void adjustmentValueChanged(AdjustmentEvent e) {
						tFood.setY(y - scroll.getValue());
					}
				});
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		panel.add(scroll);
	}

	public static ArrayList<String> Select(String select, String tableName, String condition) throws SQLException {
		Connection c = Connect();
		PreparedStatement stmt = c
				.prepareStatement("SELECT " + select + " FROM " + tableName + " WHERE " + condition + ";");
		ResultSet result = stmt.executeQuery();

		ArrayList<String> arr = new ArrayList<String>();

		while (result.next()) {
			System.out.println(result.getString(select));
			arr.add(result.getString(select));
		}
		return arr;
	}

	static void switchPane(JPanel p) {
		menuLayer.removeAll();
		menuLayer.add(p);
		menuLayer.repaint();
		menuLayer.revalidate();
	}

	public static void restart(JPanel p, String rule) throws SQLException {
		p = new JPanel();
		addMenuPanel(Connect(), p, "'" + rule + "'");
	}

	public void setBackground (JLabel p) {
		p.setBackground(new Color(163, 209, 172));
		JLabel [] foodType = {btnQuin,bChicken,bBeverage,bPizza};
		p.setBackground(new Color(163, 209, 172));
		for (JLabel i: foodType) {
			if (i==p) {
				i.setOpaque(true);
				i.repaint();
			}
			else {
				i.setOpaque(false);
				i.repaint();
			}
		}
		
	}
	public static String getDate() {
		SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date now = new Date();
		String strDate = sdfDate.format(now);
		return strDate;
	}
	
	public void repaint() {
		Connection c = Connect();
		chickenPanel.removeAll();
		beveragePanel.removeAll();
		burgerPanel.removeAll();
		pizzaPanel.removeAll();
		addMenuPanel(c, chickenPanel, "'O%'");
		addMenuPanel(c, beveragePanel, "'D%'");
		addMenuPanel(c, burgerPanel, "'B%'");
		addMenuPanel(c, pizzaPanel, "'P%'");
	}

}
