
import java.awt.BorderLayout;
import java.awt.Choice;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import javax.swing.table.TableColumn;

public class UpdateMenu extends JPanel {

	Choice choice = new Choice();
	ArrayList<Food> food;
	String[] column = { "ID", "Name", "Unit Price" };
//	String[] foodlist = { "Burger", "Chicken", "Beverage", "Pizza" };
//	String[] condition = { "'B%'", "'O%'", "'D%'", "'P%'" };
	JTable menuTable;
	private Connection c;

	/**
	 * Create the panel.
	 * 
	 * @throws SQLException
	 */
	public UpdateMenu() throws SQLException {
		c = Menu.Connect();
		setBounds(0, 0, Window.getW(), Window.getH());
		setLayout(null);
		setBackground(new Color(255, 250, 205));

		choice.setBounds(Window.getW() / 4, 50, 300, 40);
		choice.setFont(new Font("Tahoma", Font.PLAIN, 40));
		choice.addItem("Burger");
		choice.addItem("Other");
		choice.addItem("Beverage");
		choice.addItem("Pizza");
		add(choice);

		JLabel instruction = new JLabel("Please click on Go to see the Table");
		instruction.setBounds(Window.getW() - 500, 50, 300, 55);
		instruction.setFont(new Font("Arial", Font.ITALIC, 15));
		instruction.setForeground(Color.red);
		add(instruction);
		releaseTable();

		JButton bView = new JButton("View Menu");
//		bView.setBounds(instruction.getX()-400, instruction.getY(), 100, 55);
		bView.setBounds(instruction.getX()+350,instruction.getY(), 100, 55);
		bView.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

				Window.homeLayer.removeAll();
				
				Menu();
				
				Window.homeLayer.repaint();
				Window.homeLayer.revalidate();
			}
		});
		add(bView);
		
		JLabel bBack = new JLabel();
		bBack.setIcon(new ImageIcon(
				new ImageIcon("Image/back.png").getImage().getScaledInstance(50, 50, java.awt.Image.SCALE_SMOOTH)));
		bBack.setBounds(50, 35, 100, 100);
		bBack.addMouseListener(new MouseListener() {
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
				bBack.setIcon(new ImageIcon(new ImageIcon("Image/back.png").getImage().getScaledInstance(50, 50,
						java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bBack.setIcon(new ImageIcon(new ImageIcon("Image/back.png").getImage().getScaledInstance(70, 70,
						java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					Window.switchPane(new ManagerFrame());
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		bBack.setHorizontalAlignment(SwingConstants.CENTER);
		add(bBack);

		JButton bGo = new JButton("Go!");
		bGo.setBounds(Window.getW() / 2, 50, 60, 55);
		bGo.setVisible(true);
		bGo.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				instruction.setVisible(false);
				menuTable.setModel(createTableModel());
				refreshHeader();
				menuTable.repaint();
			}

		});
		add(bGo);

		JLabel lblDeleteItem = new JLabel("Delete Item");
		lblDeleteItem.setFont(new Font("Tahoma", Font.PLAIN, 30));
		lblDeleteItem.setBounds(1000, 400, 218, 59);
		lblDeleteItem.setHorizontalAlignment(JLabel.CENTER);
		add(lblDeleteItem);

		JTextField textField = new JTextField();
		textField.setFont(new Font("Tahoma", Font.PLAIN, 16));
		textField.setBounds(lblDeleteItem.getX() + 115, lblDeleteItem.getY() + 85, 146, 34);
		add(textField);
		textField.setColumns(10);

		JLabel lblNewLabel = new JLabel("Enter Item ID");
		lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 16));
		lblNewLabel.setBounds(lblDeleteItem.getX() - 31, lblDeleteItem.getY() + 94, 105, 16);
		add(lblNewLabel);

		JButton btnDelete = new JButton("Delete");
		btnDelete.setFont(new Font("Tahoma", Font.PLAIN, 20));
		btnDelete.setBounds(lblDeleteItem.getX() + 44, lblDeleteItem.getY() + 154, 134, 42);
		btnDelete.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				try {
					int check = selectID(textField.getText());
					if (check == 1) {
						JOptionPane.showMessageDialog(null, "No food ID " + textField.getText(), "Alert",
								JOptionPane.WARNING_MESSAGE);
					} else {

						if (textField.getText().isEmpty()) {
							JOptionPane.showMessageDialog(null, "Please input ID", "Error", JOptionPane.ERROR_MESSAGE);
						} else {
							String sql = "Delete from Menu where idFood = '" + textField.getText() + "' ";
							PreparedStatement s2 = c.prepareStatement(sql);
							s2.executeUpdate();
							menuTable.setModel(createTableModel());
							Menu.beveragePanel.repaint();
							Menu.burgerPanel.repaint();
							Menu.chickenPanel.repaint();
							Menu.pizzaPanel.repaint();
							refreshHeader();
						}

					}

				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

		});
		add(btnDelete);

		JLabel lblUpdateItem = new JLabel("Update Item");
		lblUpdateItem.setFont(new Font("Tahoma", Font.PLAIN, 30));
		lblUpdateItem.setHorizontalAlignment(JLabel.CENTER);
		lblUpdateItem.setBounds(200, 390, 209, 69);
		add(lblUpdateItem);

		JLabel lblEnterName = new JLabel("Enter Item Name");
		lblEnterName.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblEnterName.setBounds(lblUpdateItem.getX() - 90, lblUpdateItem.getY() + 60, 190, 35);
		add(lblEnterName);

		JLabel lblEnterPrice = new JLabel("Enter Item Price");
		lblEnterPrice.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblEnterPrice.setBounds(lblEnterName.getX(), lblEnterName.getY() + 50, 190, 35);
		add(lblEnterPrice);

		JTextField txtEnterName = new JTextField();
		txtEnterName.setFont(new Font("Tahoma", Font.PLAIN, 20));
		txtEnterName.setBounds(lblEnterName.getX() + 203, lblEnterName.getY(), 183, 31);
		add(txtEnterName);
		txtEnterName.setColumns(10);

		JTextField txtEnterPrice = new JTextField();
		txtEnterPrice.setFont(new Font("Tahoma", Font.PLAIN, 20));
		txtEnterPrice.setColumns(10);
		txtEnterPrice.setBounds(txtEnterName.getX(), lblEnterPrice.getY(), 183, 31);
		add(txtEnterPrice);

		JLabel lblEnterID = new JLabel("Enter Item ID");
		lblEnterID.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblEnterID.setBounds(lblEnterName.getX(), lblEnterName.getY() + 100, 190, 35);
		add(lblEnterID);

		JTextField txtEnterID = new JTextField();
		txtEnterID.setFont(new Font("Tahoma", Font.PLAIN, 20));
		txtEnterID.setColumns(10);
		txtEnterID.setBounds(txtEnterName.getX(), lblEnterID.getY(), 183, 31);
		add(txtEnterID);

		JLabel ImageLabel = new JLabel("Image String");
		ImageLabel.setFont(new Font("Tahoma", Font.PLAIN, 20));
		ImageLabel.setBounds(lblEnterName.getX(), lblEnterName.getY() + 150, 190, 35);
		add(ImageLabel);

		JTextField imageField = new JTextField();
		imageField.setFont(new Font("Tahoma", Font.PLAIN, 20));
		imageField.setColumns(10);
		imageField.setBounds(txtEnterName.getX(), ImageLabel.getY(), 183, 31);
		add(imageField);

		JLabel bBrowse = new JLabel(new ImageIcon(new ImageIcon("Image/browseButton.png").getImage()
				.getScaledInstance(40, 40, java.awt.Image.SCALE_SMOOTH)));
		bBrowse.setBounds(imageField.getX() + 200, imageField.getY() - 10, 70, 50);
		bBrowse.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				bBrowse.setIcon(new ImageIcon(new ImageIcon("Image/browseButton.png").getImage().getScaledInstance(40,
						40, java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				bBrowse.setIcon(new ImageIcon(new ImageIcon("Image/browseButton.png").getImage().getScaledInstance(50,
						50, java.awt.Image.SCALE_SMOOTH)));
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				JFileChooser file = new JFileChooser();
				file.setCurrentDirectory(new File(System.getProperty("user.home")));
				FileNameExtensionFilter filter = new FileNameExtensionFilter("*.Image", "png", "jpg", "gif");
				file.addChoosableFileFilter(filter);

				int result = file.showSaveDialog(null);
				if (result == JFileChooser.APPROVE_OPTION) {
					File selectedFile = file.getSelectedFile();
					String path = selectedFile.getAbsolutePath();
					imageField.setText(path);
				} else if (result == JFileChooser.CANCEL_OPTION) {
					System.out.println("No file selected");
				}
			}
		});
		add(bBrowse);
		JButton btnAdd = new JButton("Add");
		btnAdd.setBounds(lblUpdateItem.getX() - 43, lblUpdateItem.getY() + 260, 97, 25);
		btnAdd.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {

				if (txtEnterID.getText().isEmpty() == true || txtEnterName.getText().isEmpty() == true
						|| txtEnterPrice.getText().isEmpty() == true || imageField.getText().isEmpty() == true) {
					JOptionPane.showMessageDialog(null, "Please input all the fields", "Error",
							JOptionPane.ERROR_MESSAGE);
				} else {
					System.out.println("txtenter = " + txtEnterID.getText());
					int dialogbutton = JOptionPane.showConfirmDialog(null,
							"Are you sure? \n You can't edit the ID anymore!", "WARNING", JOptionPane.YES_NO_OPTION);

					if (dialogbutton == JOptionPane.YES_OPTION) {
						try {
							int check = selectID(txtEnterID.getText());
							if (check == 2) {
								JOptionPane.showMessageDialog(null, "Food existed. \n You can only update", "Error",
										JOptionPane.ERROR_MESSAGE);
							} else {

								String iFood = "insert into Menu (idFood, name, price, imagePath) values('"
										+ txtEnterID.getText() + "','" + txtEnterName.getText() + "','"
										+ txtEnterPrice.getText() + "','" + imageField.getText() + "')";
								PreparedStatement s = c.prepareStatement(iFood);
								s.executeUpdate();

								menuTable.setModel(createTableModel());
								Menu.beveragePanel.repaint();
								Menu.burgerPanel.repaint();
								Menu.chickenPanel.repaint();
								Menu.pizzaPanel.repaint();
								refreshHeader();
							}

						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

					}
				}
				imageField.setText(null);
				txtEnterID.setText(null);
				txtEnterName.setText(null);
				txtEnterPrice.setText(null);
			}

		});
		add(btnAdd);

		JButton btnUpdate = new JButton("Update");
		btnUpdate.setBounds(lblUpdateItem.getX() + 147, btnAdd.getY(), 97, 25);
		btnUpdate.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				try {
					String update = "", name = "", price = "", update2 = "", image = "";
					if (txtEnterName.getText().isEmpty() == false) {
						name = "name ='" + txtEnterName.getText() + "' ";
					}

					if (txtEnterPrice.getText().isEmpty() == false) {
						price = "price ='" + txtEnterPrice.getText() + "' ";
					}
					if (txtEnterName.getText().isEmpty() == false && txtEnterPrice.getText().isEmpty() == false) {
						update = ",";
					}
					if (imageField.getText().isEmpty() == false) {
						System.out.println("Image = " + imageField.getText());
						image = "imagePath = '" + imageField.getText() + "'";
					}
					if (imageField.getText().isEmpty() == false && txtEnterPrice.getText().isEmpty() == false) {
						update2 = ",";
					}

					int check = selectID(txtEnterID.getText());
					if (check == 1) {
						JOptionPane.showMessageDialog(null, "No food ID " + textField.getText(), "Alert",
								JOptionPane.WARNING_MESSAGE);
					} else {
						if (txtEnterPrice.getText().isEmpty() == true && txtEnterName.getText().isEmpty() == true
								&& txtEnterPrice.getText().isEmpty() == true
								&& imageField.getText().isEmpty() == true) {
							JOptionPane.showMessageDialog(null, "You have to input one of the fields", "Error",
									JOptionPane.ERROR_MESSAGE);
						}
						else {
							String sql = "update Menu set " + name + update + price + update2 + image + " where idFood = '"
									+ txtEnterID.getText() + "'";
							PreparedStatement s = c.prepareStatement(sql);
							s.executeUpdate();
							menuTable.setModel(createTableModel());
							Menu.beveragePanel.repaint();
							Menu.burgerPanel.repaint();
							Menu.chickenPanel.repaint();
							Menu.pizzaPanel.repaint();
							refreshHeader();
						}
						
					}

					imageField.setText(null);
					txtEnterID.setText(null);
					txtEnterName.setText(null);
					txtEnterPrice.setText(null);

				} catch (SQLException e) {
					e.printStackTrace();
				}

			}

		});
		add(btnUpdate);

	}

	private ArrayList<Food> getMenu(Choice choice) {
		ArrayList<Food> menu = new ArrayList<>();
		String condition = null;

		switch (choice.getSelectedItem()) {
		case "Burger":
			condition = "'B%'";
			break;
		case "Other":
			condition = "'O%'";
			break;
		case "Beverage":
			condition = "'D%'";
			break;
		case "Pizza":
			condition = "'P%'";
			break;
		}

//		Connection c = null;
		try {
//			c = Menu.Connect();
			String getMenu = "SELECT * FROM Menu WHERE idFood LIKE " + condition;
			PreparedStatement s = c.prepareStatement(getMenu);
			ResultSet result = s.executeQuery();
			while (result.next()) {
				Food tFood = new Food(result.getString("idFood"), result.getString("name"), result.getInt("price"));
				menu.add(tFood);
			}
//			c.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return menu;

	}

	public DefaultTableModel createTableModel() {
		food = getMenu(choice);
//		System.out.println(food);
		Object[] row = new Object[column.length];
		DefaultTableModel model = new DefaultTableModel(0, column.length);

		// add row
		for (int i = 0; i < food.size(); i++) {
			row[0] = food.get(i).getId();
			row[1] = food.get(i).getFoodname();
			row[2] = food.get(i).getPrice();
			model.addRow(row);

		}

		return model;

	}

	private void refreshHeader() {
		for (int i = 0; i < column.length; i++) {
			JTableHeader header = menuTable.getTableHeader();
			TableColumn col = header.getColumnModel().getColumn(i);
			col.setHeaderValue(column[i]);
			header.repaint();
		}
	}

	private void releaseTable() {
		menuTable = new JTable(createTableModel()) {

			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}

		};
		menuTable.setFont(new Font("Tahoma", Font.PLAIN, 30));
		menuTable.getTableHeader().setFont(new Font("SansSerif", Font.BOLD, 30));
		menuTable.setRowHeight(60);

		refreshHeader();

		JScrollPane js = new JScrollPane(menuTable);
		js.setBounds(25, 150, Window.getW() - 50, 250);
		js.setVisible(true);
		add(js);

	}

	private int selectID(String ID) {
		int i = 0;
		try {
			String getID = "SELECT idFood FROM Menu WHERE idFood ='" + ID + "'";
			PreparedStatement s = c.prepareStatement(getID);
			ResultSet result = s.executeQuery();
			if (result.next() == true) {
				i = 2;

			} else
				i = 1;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return i;
	}

	private void Menu() {
		Menu.bl = false;
		Menu m;
		try {
			m = new Menu();
			m.Layer();
			m.menuLayer.removeAll();
			m.Layer();
			Window.switchPane(m);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
