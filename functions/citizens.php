 <?php
      include 'dbcon.php';
      
?>

      
  <table class="w3-table w3-hoverable w3-responsive w3-white" border="0">
      <tr>
        <th class="w3-dark-grey w3-center" colspan="5">WANANCHI WOTE</th>
      </tr>
      <tr class="w3-light-grey w3-border-bottom" >
        <th>Namba ya Mkazi</th>
        <th>Jina la Mkazi</th>
        <th>Simu</th>
        <th>Mitaro</th>
      </tr>
    
      <?php

          //&& !$searchclaims
          $citizen = pg_query($dbcon,"SELECT * FROM users");
          if (!$citizen) {
        echo "Hakuna wananchi wowote walioandikishwa ";
      }
          while($user_row=pg_fetch_assoc($citizen)) {
            $user = $user_row['id'];
            $mhusika = $user_row['first_name'].' '.$user_row['last_name'];
            $namba = $user_row['sms_number'];
            $mitaro = " ";

            $sqlClaims = pg_query($dbcon,"SELECT * FROM sidewalk_claims WHERE user_id='$user'");

            if(pg_num_rows($sqlClaims) > 0) {
              while ($claimsInfo=pg_fetch_assoc($sqlClaims)) {
                $mitaro .=$claimsInfo['gid'];
              }

            } else {
              echo $mitaro ="No Claims";
              
            }
      ?>
      <tr>
        <td><?php echo $user; ?></td>
        <td><?php echo $mhusika; ?></td>
        <td><?php echo $namba; ?></td>
        <td><?php echo $mitaro; ?></td>
         <?php } //End While
           ?>
      </tr>

      </table>
