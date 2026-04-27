@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String description;

  private Double price;

  private Integer stock;

  private String imageUrl;

  private String category;

  private Boolean active;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}