
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JTextArea;
import javax.swing.border.EmptyBorder;
import javax.swing.JButton;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.HeadlessException;
import java.awt.Color;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import java.awt.SystemColor;
import java.util.ArrayList;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.awt.event.ActionEvent;

public class bill extends JFrame {

	private JPanel contentPane;
	private JTextArea txtYourName;
	private JTextArea textAddress;
	private JTextArea textField_2;
	private JTextArea txtPrice;
	private JTextField txtOrders;
	private JTextField txtUnits;
	private JTextArea txtFoodGoesHere;
	private JTextArea textQty;
	private JTextField txtPriceLabel;
	JButton btnOrder = new JButton("Order Now!");
	JButton bPay = new JButton("Cash");
	JLabel txtTotal;
	static boolean cash = false;
	public int i;
	private JPanel panel = new JPanel();
	private int yButton = 548, yTxtName = 125, yTxtAddress = 190;
	private int ytextField2 = 24, yTxtOrders = 258, yTxtUnits = 310, line = 305;
	static ArrayList<FoodItem> payFoodList = Menu.payFoodList;

	/**
	 * Launch the application.
	 */

	/**
	 * Create the frame.
	 */
	public void scroll(int value) {
//		yButton++;
//		yTxtName++;
//		yTxtAddress++;
//		ytextField2++;
//		yTxtOrders++;
//		yTxtUnits++;
//		line++;

//		btnOrder.setBounds(155, yButton-value, 152, 57);
		txtYourName.setBounds(44, yTxtName - value, 306, 57);
		textAddress.setBounds(44, yTxtAddress - value, 351, 57);
		textField_2.setBounds(46, ytextField2 - value, 152, 57);

		txtUnits.setBounds(185, yTxtOrders - value, 65, 22);
		txtOrders.setBounds(44, yTxtOrders - value, 65, 22);
		txtPriceLabel.setBounds(301, yTxtOrders - value, 49, 22);

		panel.setBounds(0, line - value, 492, 734);
	}

	public bill(User user, ArrayList<FoodItem> foodList) {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(Window.getW()-492, 0, 492, 734);
		setResizable(false);

		if (Menu.orderMore == 0) {
			i = writeID() + 1;
		} else
			i = writeID();

		contentPane = new JPanel();
		contentPane.setBackground(Color.WHITE);
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
//		contentPane.setBounds(0, -500, 492, 734);
		setContentPane(contentPane);
		contentPane.setLayout(null);

		btnOrder.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Menu.orderMore++;
				boolean bl = false;
				for (FoodItem t : foodList) {
					for (FoodItem p : payFoodList) {
						if (p.getName().equals(t.getName())) {
							System.out.println("Same name");
							int q = p.getQty();
							payFoodList.remove(p);
							payFoodList.add(new FoodItem(t.getName(), t.getPrice(), q + t.getQty()));
							bl = true;
							break;
						}
					}
					if (payFoodList.size() == 0 || bl == false)
						payFoodList.add(t);
				}

//				Menu.burgerPanel = new JPanel();
				JPanel burgerPanel, chickenPanel, beveragePanel, pizzaPanel;

				burgerPanel = Menu.burgerPanel;
				chickenPanel = Menu.chickenPanel;
				beveragePanel = Menu.beveragePanel;
				pizzaPanel = Menu.pizzaPanel;

				burgerPanel = new JPanel();
				chickenPanel = new JPanel();
				beveragePanel = new JPanel();
				pizzaPanel = new JPanel();
				try {
					Connection c = Menu.Connect();
					Menu.addMenuPanel(c, burgerPanel, "'B%'");
					Menu.addMenuPanel(c, chickenPanel, "'C%'");
					Menu.addMenuPanel(c, beveragePanel, "'D%'");
					Menu.addMenuPanel(c, pizzaPanel, "'P%'");

					for (FoodItem t : foodList) {
						String to_delivery = "insert into Delivery (id,name,food,unit,address,date,status,username) values (?,?,?,?,?,?,?,?)";
						PreparedStatement st = c.prepareStatement(to_delivery);
						st.setInt(1, i);
						st.setString(2, user.getName());
						st.setString(3, t.getName());
						st.setLong(4, t.getQty());
						
						if (user.getTableID() != null) {
							st.setString(5, user.getTableID());
						} else
						st.setString(5, "Delivery");
						st.setString(6, Menu.getDate());
						st.setInt(7, 2);
						st.setString(8, LoginFrame.user.getUsername());
						st.executeUpdate();
//						Window.switchPane(new Menu());
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				dispose();
				foodList.clear();
			}
		});
		btnOrder.setForeground(new Color(240, 255, 255));
		btnOrder.setBackground(new Color(107, 142, 35));
		btnOrder.setFont(new Font("VnFujiyama2", Font.BOLD, 16));
		btnOrder.setBounds(155, yButton, 152, 57);

		bPay.setForeground(new Color(240, 255, 255));
		bPay.setBackground(new Color(107, 142, 35));
		bPay.setFont(new Font("VnFujiyama2", Font.BOLD, 16));
		bPay.setBounds(155, yButton, 152, 57);
		bPay.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Menu.orderMore = 0;
				CreditCard cc;
				
				try {
					cc = new CreditCard();
					cc.setVisible(true);
					
					Connection c = Menu.Connect();
					for (FoodItem t : payFoodList) {
						String to_delivery = "insert into Delivery (id,name,food,unit,address,date,status,username) values (?,?,?,?,?,?,?,?)";
						PreparedStatement st = c.prepareStatement(to_delivery);
						st.setInt(1, i);
						st.setString(2, user.getName());
						st.setString(3, t.getName());
						st.setLong(4, t.getQty());
						
						if (user.getTableID() != null) {
							st.setString(5, user.getTableID());
						} else
						st.setString(5, "Delivery");
						st.setString(6, Menu.getDate());
						st.setInt(7, 1);
						st.setString(8, LoginFrame.user.getUsername());
						st.executeUpdate();
//						Window.switchPane(new Menu());
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				dispose();
			}
		});

		if (!cash)
			contentPane.add(btnOrder);
		else
			contentPane.add(bPay);

		txtYourName = new JTextArea();
		txtYourName.setBackground(Color.WHITE);
		txtYourName.setFont(new Font("Tahoma", Font.PLAIN, 17));
		txtYourName.setEditable(false);
		txtYourName.setText("Your Name: " + user.getName());
		txtYourName.setBounds(44, yTxtName, 306, 57);
		contentPane.add(txtYourName);
		txtYourName.setColumns(10);

		textAddress = new JTextArea();
		if (user.getTableID() != null) {
			textAddress.setText("Table: " + user.getTableID());
		} else
			textAddress.setText("Address: " + user.getAddress());
		textAddress.setFont(new Font("Tahoma", Font.PLAIN, 17));
		textAddress.setEditable(false);
		textAddress.setLineWrap(true);
		textAddress.setColumns(10);
		textAddress.setBackground(Color.WHITE);
		textAddress.setBounds(44, yTxtAddress, 351, 57);
		contentPane.add(textAddress);

		textField_2 = new JTextArea();
		textField_2.setForeground(Color.BLACK);

		textField_2.setText("#" + i);
		textField_2.setFont(new Font("Trebuchet MS", Font.PLAIN, 45));
		textField_2.setEditable(false);
		textField_2.setColumns(10);
		textField_2.setBackground(Color.WHITE);
		textField_2.setBounds(46, ytextField2, 152, 57);
		contentPane.add(textField_2);

		txtOrders = new JTextField();
		txtOrders.setEditable(false);
		txtOrders.setHorizontalAlignment(SwingConstants.CENTER);
		txtOrders.setFont(new Font("Tahoma", Font.PLAIN, 15));
		txtOrders.setText("Order(s)");
		txtOrders.setBounds(44, 258, 65, 22);
		contentPane.add(txtOrders);
		txtOrders.setColumns(10);

		txtUnits = new JTextField();
		txtUnits.setEditable(false);
		txtUnits.setHorizontalAlignment(SwingConstants.CENTER);
		txtUnits.setFont(new Font("Tahoma", Font.PLAIN, 15));
		txtUnits.setText("Unit(s)");
		txtUnits.setBounds(185, 258, 65, 22);
		contentPane.add(txtUnits);
		txtUnits.setColumns(10);

		txtPriceLabel = new JTextField();
		txtPriceLabel.setEditable(false);
		txtPriceLabel.setHorizontalAlignment(SwingConstants.CENTER);
		txtPriceLabel.setFont(new Font("Tahoma", Font.PLAIN, 15));
		txtPriceLabel.setText("Price");
		txtPriceLabel.setBounds(301, 258, 49, 22);
		contentPane.add(txtPriceLabel);
		txtPriceLabel.setColumns(10);

		panel.setLayout(null);
		panel.setBounds(0, line, 492, 734);
		panel.setBackground(Color.white);
		add(panel);

		int sl = 0;
		int y = 0;
		for (FoodItem f : foodList) {
			System.out.println(f);
			txtFoodGoesHere = new JTextArea();
			txtFoodGoesHere.setFont(new Font("Tahoma", Font.PLAIN, 15));
			txtFoodGoesHere.setEditable(false);
			txtFoodGoesHere.setText(f.getName());
			txtFoodGoesHere.setBounds(44, y, 101, 22);
			panel.add(txtFoodGoesHere);
			txtFoodGoesHere.setColumns(10);

			textQty = new JTextArea();
			textQty.setFont(new Font("Tahoma", Font.PLAIN, 15));
			textQty.setEditable(false);
			textQty.setText("" + f.getQty());
			textQty.setBounds(185, y, 65, 22);
			panel.add(textQty);
			textQty.setColumns(10);

			txtPrice = new JTextArea();
			txtPrice.setFont(new Font("Tahoma", Font.PLAIN, 15));
			txtPrice.setText("" + f.getPrice() * f.getQty());
			txtPrice.setBounds(301, y, 65, 22);
			panel.add(txtPrice);
			txtPrice.setColumns(10);

			y = y + txtFoodGoesHere.getFont().getSize() + 10;
			sl++;
		}
		JLabel dotline = new JLabel("------------------------------------------------------------------------------");
		dotline.setBounds(40, y, 320, 30);
		dotline.setHorizontalAlignment(SwingConstants.CENTER);
		panel.add(dotline);

		txtTotal = new JLabel("Total: " + Menu.total);
		txtTotal.setBounds(44, y + 30, 311, 40);
		txtTotal.setFont(new Font("Arial", Font.BOLD, 30));
		txtTotal.setHorizontalAlignment(SwingConstants.RIGHT);
		panel.add(txtTotal);

		JScrollBar scroll = new JScrollBar();
		scroll.setBounds(460, 0, 15, 700);
		if (sl > 9)
			getContentPane().add(scroll);
		scroll.addAdjustmentListener(new AdjustmentListener() {
			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				scroll(scroll.getValue());
			}
		});
//		scroll.setMaximum(maximum);

	}

	public int writeID() {
		int i = 0;
		Connection c;
		try {
			c = Menu.Connect();
			String query2 = "select max (id) from Delivery";
			Statement st2 = c.createStatement();
			ResultSet rs = st2.executeQuery(query2);
			while (rs.next()) {
				i = rs.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return i;
	}
}
